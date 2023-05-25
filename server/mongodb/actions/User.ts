/* eslint-disable */

import bcrypt from 'bcrypt'
import CompanySchema from '../models/Company'
import * as EmailValidator from 'email-validator'
import dbConnect from 'server/utils/dbConnect'
import UserModel from 'server/mongodb/models/User'
import { Errors, PartialUser, Role, User } from 'src/utils/types'
import { ObjectId } from 'mongoose'
import { getAccessToken } from 'server/utils/Authentication'

export async function getUserByEmail(email: string): Promise<any> {
  await dbConnect()
  const user = await UserModel.findOne({ email: email })
  return user
}
export async function login({
  email,
  password
}: {
  email: string
  password: string
}) {
  if (!email || !password) throw new Error(Errors.user.MISSING_INFO)

  const user = await getUserByEmail(email)

  if (!user) throw new Error(Errors.user.INCORRECT_LOGIN)
  const passwordMatch = await bcrypt.compare(password, user._doc.password)

  if (!passwordMatch) throw new Error(Errors.user.INCORRECT_LOGIN)
  return getAccessToken(user._doc)
}

// uncomment to create admin login

// export async function signUp({ email, password }) {
//   if (!email || !password) throw new Error(errors.user.MISSING_INFO)

//   const validEmail = EmailValidator.validate(email)
//   if (!validEmail) throw new Error(errors.user.INVALID_EMAIL)
//   if (password.length < 8) throw new Error(errors.user.INVALID_PASSWORD)

//   await mongoDB()

//   let user = await User.findOne({ email })
//   if (user) throw new Error(errors.user.UNAVAILABLE_EMAIL)

//   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

//   user = await User.create({
//     email,
//     password: hashedPassword,
//     roles: [Role.NONPROFIT_ADMIN]
//   })

//   if (!user) throw new Error(errors.user.INVALID_ATTRIBUTES)

//   const jwtPayload = { id: user._id, email: user.email }
//   const jwtOptions = { expiresIn: TOKEN_DURATION }
//   return jwt.sign(jwtPayload, JWT_SECRET, jwtOptions)
// }

const SALT_ROUNDS = 10
export async function signUp({
  email,
  password,
  utilityCompanyName
}: {
  email: string
  password: string
  utilityCompanyName: string
}) {
  if (!email || !password) throw new Error(Errors.user.MISSING_INFO)

  const validEmail = EmailValidator.validate(email)

  if (!validEmail) throw new Error(Errors.user.INVALID_EMAIL)

  if (password.length < 8) throw new Error(Errors.user.INVALID_PASSWORD)

  await dbConnect()

  let user = await UserModel.findOne({ email })

  if (user) throw new Error(Errors.user.UNAVAILABLE_EMAIL)

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  user = await UserModel.create({
    email,
    password: hashedPassword,
    roles: [Role.UTILITY_COMPANY]
  })

  if (!user) throw new Error(Errors.user.INVALID_ATTRIBUTES)

  let utilityCompany = await CompanySchema.create({
    accountId: user._id,
    name: utilityCompanyName,
    email: email,
    number: '1234',
    address: '1234',
    city: '12345',
    state: '12345',
    zip: '12346'
  })

  if (!utilityCompany) throw new Error(Errors.company.INVALID_ATTRIBUTES)

  await UserModel.updateOne(
    { _id: user._id },
    { utilityCompany: utilityCompany._id }
  )

  return getAccessToken(user)
}

export async function update({
  id,
  ...attributes
}: {
  id: string | ObjectId
  attributes: any
}) {
  if (!id) throw new Error(Errors.user.MISSING_INFO)

  if ((attributes as unknown as PartialUser).password) {
    ;(attributes as unknown as PartialUser).password = await bcrypt.hash(
      (attributes as unknown as PartialUser).password,
      SALT_ROUNDS
    )
  }

  await dbConnect()
  const user = await UserModel.findOne({ _id: id })
  if (!user) throw new Error(Errors.user.INVALID_ID)

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: id },
    attributes,
    {
      new: true
    }
  )
  if (!updatedUser) throw new Error(Errors.user.INVALID_ATTRIBUTES)
  return updatedUser
}

export const getOneById = async (id: string | ObjectId) => {
  await dbConnect()
  const user = UserModel.findById(id)
  return user
}
