// Modified API Wrapper Inspired By Nationals NPP Portal: https://github.com/GTBitsOfGood/national-npp/blob/main/server/utils/APIWrapper.ts
import mongoose, { ObjectId } from 'mongoose'
import { NextApiResponse } from 'next'
import {
  getAccessToken,
  getRefreshToken,
  getUser,
  isJwtExpired,
  isJwtValid,
  verifyRefreshToken
} from 'server/utils/Authentication'
import {
  Errors,
  HttpMethod,
  InternalRequest,
  InternalResponseData,
  Role,
  User
} from 'src/utils/types'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { getOneById } from 'server/mongodb/actions/User'
import { CookieValueTypes, getCookie, setCookie } from 'cookies-next'

interface RouteConfig {
  requireToken?: boolean
  roles?: Array<Role>
  skipIfNoToken?: boolean
  handleResponse?: boolean
}

interface Route<T> {
  config?: RouteConfig
  handler: (
    req: InternalRequest,
    res: NextApiResponse<InternalResponseData<T>>
  ) => Promise<T>
}

function APIWrapper(
  routeHandlers: Partial<Record<HttpMethod, Route<unknown>>>
) {
  return async (req: InternalRequest, res: NextApiResponse) => {
    const method = req.method
    const route = routeHandlers[method as HttpMethod]

    if (!method || !route) {
      const errorMessage = method
        ? `Request method ${method} is invalid.`
        : 'Missing request method.'

      return res.status(400).json({
        success: false,
        message: errorMessage
      })
    }

    const { config, handler } = route

    try {
      // token settings
      let tokenSettings = {}
      // Handle user access token + roles restrictions
      if (config?.requireToken) {
        if (!req.headers.accesstoken && config?.skipIfNoToken !== undefined) {
          console.log('Skipping, no token')
        } else {
          let user: null | any = null
          const refreshToken = getCookie('refreshtoken', {
            httpOnly: true,
            req: req,
            res: res
          }) as string
          if (
            isJwtExpired(req.headers.accesstoken as string) &&
            !isJwtValid(refreshToken as string)
          ) {
            return res.status(403).json({
              success: false,
              message: Errors.token.IS_INVALID
            })
          }
          // if accesstoken is expired, create new one
          else if (isJwtExpired(req.headers.accesstoken as string)) {
            const userId = verifyRefreshToken(refreshToken as string)
            user = await getOneById(
              (userId as Partial<User>)?._id as unknown as string
            )
            if (!user) {
              return res.status(403).json({
                success: false,
                message: Errors.user.DOESNT_EXIST
              })
            }
            tokenSettings = {
              accessToken: getAccessToken(user._doc as User)
            }
            setCookie('refreshtoken', getRefreshToken(user._doc as User), {
              httpOnly: true,
              req: req,
              res: res
            })
          } else {
            user = getUser(req.headers.accesstoken as string)
          }

          if (config.roles) {
            if (
              config.roles.length !== 0 &&
              !config.roles.some((role) => user?.roles?.includes(role))
            ) {
              return res.status(403).json({
                success: false,
                message: Errors.user.MISSING_PERMISSIONS
              })
            }
          }
        }
      }
      const data = await handler(req, res)
      if (config?.handleResponse) {
        return
      }

      return res
        .status(200)
        .json({ success: true, payload: data, ...tokenSettings })
    } catch (e) {
      if (e instanceof mongoose.Error) {
        return res.status(500).json({
          success: false,
          message: 'An Internal Server error occurred.'
        })
      }

      const error = e as Error
      return res.status(400).json({ success: false, message: error.message })
    }
  }
}

export default APIWrapper
