import { setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { signUp } from 'server/mongodb/actions/User'
import APIWrapper from 'server/utils/APIWrapper'
import { getLoginRefreshToken } from 'server/utils/Authentication'

export default APIWrapper({
  POST: {
    config: {},
    handler: async (req: NextApiRequest, res: NextApiResponse) => {
      const accessToken = await signUp(req.body)
      const refreshToken = await getLoginRefreshToken(req.body)
      setCookie('refreshtoken', refreshToken, {
        httpOnly: true,
        req: req,
        res: res
      })
      return accessToken
    }
  }
})
