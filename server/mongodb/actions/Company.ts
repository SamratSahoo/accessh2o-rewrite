import CompanyModel from 'server/mongodb/models/Company'
import dbConnect from 'server/utils/dbConnect'
import * as EmailValidator from 'email-validator'
import { Company, Errors } from 'src/utils/types'

export async function addCompany(company: Company): Promise<Company> {
  await dbConnect()
  const newCompany = await CompanyModel.create(company)
  return newCompany
}

export async function getCompany(
  accountId: Company['accountId']
): Promise<Company> {
  await dbConnect()
  const company = await CompanyModel.findOne({ accountId: accountId })
  return company as Company
}

export async function updateCompany(
  companyAttributes: Company
): Promise<Company> {
  const accountId = companyAttributes.accountId
  const attributes = companyAttributes

  if (accountId === '') throw new Error(Errors.user.MISSING_INFO)

  await dbConnect()

  if (attributes.email !== '') {
    const validEmail = EmailValidator.validate(attributes.email)
    if (!validEmail) throw new Error(Errors.user.INVALID_EMAIL)
  }

  const company = await CompanyModel.findOne({ accountId: accountId })
  if (company === undefined) throw new Error(Errors.user.INVALID_ID)

  const updatedCompany = await CompanyModel.findOneAndUpdate(
    { accountId: accountId },
    { $set: attributes },
    { new: true, runValidators: true, omitUndefined: true }
  )
  return updatedCompany as Company
}
