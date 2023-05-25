import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User, DecodedToken } from 'src/utils/types'
import { getUserByEmail } from 'server/mongodb/actions/User'

export const getUser = (accesstoken: string): User | null => {
  if (!accesstoken) {
    return null
  }
  const data = verifyWebToken(accesstoken)
  return data
}

export const hashString = async (stringToHash: string) => {
  const saltRounds = 10
  const hashed = await bcrypt.hash(stringToHash, saltRounds)
  return hashed
}

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  const res = await bcrypt.compare(password, hashedPassword)
  return res
}

export const getAccessToken = (data: Partial<User> | User): string => {
  return jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: '1m'
  })
}

export const getLoginRefreshToken = async (data: Partial<User> | User) => {
  const user = await getUserByEmail(data.email as string)
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string)
}
export const getRefreshToken = (data: Partial<User> | User): string => {
  return jwt.sign({ _id: data._id }, process.env.JWT_SECRET as string)
}

export const verifyWebToken = (webToken: string): User => {
  const data = jwt.verify(webToken, process.env.JWT_SECRET as string, {
    ignoreExpiration: true
  })
  return data as User
}

export const verifyRefreshToken = (webToken: string) => {
  const data = jwt.verify(webToken, process.env.JWT_SECRET as string)
  return data
}

export const isJwtExpired = (token: string): boolean => {
  try {
    const decodedToken: DecodedToken = jwt.decode(token) as DecodedToken
    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000 // Convert milliseconds to seconds
      return decodedToken.exp < currentTime
    }
  } catch (error) {
    return true
  }

  return true // Treat as expired if decoding fails
}

export const isJwtValid = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string, {
      ignoreExpiration: true
    })
    return true
  } catch (error) {
    return false
  }
}
