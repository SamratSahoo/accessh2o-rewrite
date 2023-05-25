import mongoose, { Types } from 'mongoose'
import { NextApiRequest } from 'next/types'

export enum Role {
  UTILITY_COMPANY = 'Utility Company',
  NONPROFIT_ADMIN = 'Nonprofit Admin'
}
export enum ClientStatus {
  Incomplete = 'Incomplete',
  AwaitingUtility = 'Awaiting Utility',
  AwaitingAccessH2O = 'Awaiting AccessH2O',
  Approved = 'Approved',
  Completed = 'Completed',
  Denied = 'Denied',
  Terminated = 'Terminated'
}

export interface EligibilityQuestion {
  _id?: Types.ObjectId
  title: string
  question: string
}

export interface EligibilityQA {
  question: EligibilityQuestion
  answer: boolean
}

export interface DocumentQuestion {
  _id?: Types.ObjectId
  title: string
  description: string
}

export interface DocumentQA {
  question: DocumentQuestion
  answer: Buffer
}

export interface Info {
  accountId: string
  eligibilityQuestions: EligibilityQA[]
  documents: DocumentQA[]
  otherQuestions: OtherQA[]
}

export interface Note {
  accountID: String
  sender: string
  receiver: string
  date: Date
  message: string
}

export interface OtherQuestion {
  _id?: Types.ObjectId
  question: string
}

export interface OtherQA {
  question: OtherQuestion
  answer: string
}

/* Internal Request & API Wrapper Types */

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface InternalRequest extends NextApiRequest {
  body: { [key: string]: unknown }
}

export interface InternalRequestData {
  url: string
  authRequired?: boolean
  method: HttpMethod
  body?: { [key: string]: unknown }
  queryParams?: { [key: string]: string | number | boolean | undefined }
}

export interface InternalResponseData<T> {
  success: boolean
  message?: string
  payload?: T
  accessToken?: string
}

export interface Company {
  accountId?: string
  name: string
  email: string
  number: string
  address: string
  city: string
  state: string
  zip: string
}

export interface Client {
  name: string
  utilityCompany: string
  accountId: string
  status: ApplicantStatus
  propertyAddress: string
  applied: Date
  phone: string
  utilityCompanyId?: Types.ObjectId
  documents?: File[]
}

export interface Applicant {
  name: string
  utilityCompany: string
  accountId: string
  status: ApplicantStatus
  propertyAddress: string
  applied: Date
  notes?: [string]
  eligibilityStatuses?: {
    question: string
    answer: boolean
  }
  documents?: [String]
  otherQuestions?: [string]
}

export enum ApplicantStatus {
  AwaitingUtility = 'Awaiting Utility',
  AwaitingAccessH2O = 'Awaiting AccessH2O',
  Approved = 'Approved',
  Completed = 'Completed',
  Denied = 'Denied',
  Terminated = 'Terminated'
}

export const ApplicantStatusColor: { [key in ApplicantStatus]: string } = {
  [ApplicantStatus.Approved]: '#BEF2BD',
  [ApplicantStatus.AwaitingAccessH2O]: '#BDECF2',
  [ApplicantStatus.AwaitingUtility]: '#F2E3BD',
  [ApplicantStatus.Completed]: '#D4BDF2',
  [ApplicantStatus.Denied]: '#F2BDBD',
  [ApplicantStatus.Terminated]: '#C5C7CA'
}

export interface Status {
  accountId: string
  status: ApplicantStatus
}

export interface InfoSubmission {
  accountId: string
  eligibilityQuestions: EligibilityQA[]
  documents: DocumentQA[]
  otherQuestions: OtherQA[]
}

export interface User {
  _id: Types.ObjectId
  email: string
  password: string
  roles: Array<Role>
  utilityCompany: string
}

export type PartialUser = Omit<User, '_id'>

export interface DecodedToken {
  exp: number
}

export const Errors = {
  general: {
    DB_CONNECTION: 'An error occurred while connecting to the database.'
  },
  user: {
    MISSING_INFO: 'Insufficient information provided.',
    INCORRECT_LOGIN: 'Incorrect email address or password.',
    INVALID_ID: 'Invalid ID provided.',
    INVALID_EMAIL: 'Invalid email address provided.',
    INVALID_PASSWORD: 'Password must be at least 8 characters.',
    INVALID_ATTRIBUTES: 'One or more provided attributes are invalid.',
    UNAVAILABLE_EMAIL: 'Email address is unavailable.',
    ADMIN_ONLY: 'Only admin can access this content',
    MISSING_PERMISSIONS: 'You do not have permissions to access this API route',
    DOESNT_EXIST: 'This user no longer exists.'
  },
  token: {
    DOESNT_EXIST: 'No users are currently signed in.',
    IS_INVALID: 'The provided token is invalid.',
    DELETED_USER: 'The desired user no longer exists.'
  },
  company: {
    UNAVAILABLE_COMPANY: 'No company is found with this id.',
    INVALID_ATTRIBUTES: 'One or more provided attributes are invalid.'
  }
}
