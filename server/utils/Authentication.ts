import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from 'src/utils/types'

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
        expiresIn: '15m',
    })
}

export const getRefreshToken = (data: Partial<User> | User) => {
    return jwt.sign({ userId: data._id }, process.env.JWT_SECRET as string, {
        expiresIn: '600m',
    })
}

export const verifyWebToken = (webToken: string): User => {
    const data = jwt.verify(webToken, process.env.JWT_SECRET as string, {
        ignoreExpiration: false,
    })
    return data as User
}

export const verifyRefreshToken = (webToken: string): Partial<User> => {
    const data = jwt.verify(webToken, process.env.JWT_SECRET as string)
    return data as Partial<User>
}
