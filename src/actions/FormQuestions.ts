import { Types } from 'mongoose'
import { internalRequest } from 'src/utils/request'
import {
  DocumentQuestion,
  EligibilityQuestion,
  HttpMethod,
  OtherQuestion
} from 'src/utils/types'
import urls from 'src/utils/urls'

const getEligibilityQuestionsUrl =
  urls.baseUrl + urls.api.formQuestions.getEligibilityQuestions
const getDocumentQuestionsUrl =
  urls.baseUrl + urls.api.formQuestions.getDocumentQuestions
const getOtherQuestionsUrl =
  urls.baseUrl + urls.api.formQuestions.getOtherQuestions
const addEligibilityQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.addEligibilityQuestion
const addDocumentQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.addDocumentQuestion
const addOtherQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.addOtherQuestion
const editEligibilityQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.editEligibilityQuestion
const editDocumentQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.editDocumentQuestion
const editOtherQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.editOtherQuestion
const removeEligibilityQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.removeEligibilityQuestion
const removeDocumentQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.removeDocumentQuestion
const removeOtherQuestionUrl =
  urls.baseUrl + urls.api.formQuestions.removeOtherQuestion

export const getEligibilityQuestions = async () => {
  return internalRequest<EligibilityQuestion[]>({
    url: getEligibilityQuestionsUrl,
    method: HttpMethod.GET,
    authRequired: true
  })
}

export const getDocumentQuestions = async () => {
  return internalRequest<DocumentQuestion[]>({
    url: getDocumentQuestionsUrl,
    method: HttpMethod.GET,
    authRequired: true
  })
}

export const getOtherQuestions = async () => {
  return internalRequest<OtherQuestion[]>({
    url: getOtherQuestionsUrl,
    method: HttpMethod.GET,
    authRequired: true
  })
}

export const addEligibilityQuestion = async (question: EligibilityQuestion) => {
  return internalRequest<EligibilityQuestion>({
    url: addEligibilityQuestionUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const addDocumentQuestion = async (question: DocumentQuestion) => {
  return internalRequest<DocumentQuestion>({
    url: addDocumentQuestionUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const addOtherQuestion = async (question: OtherQuestion) => {
  return internalRequest<OtherQuestion>({
    url: addOtherQuestionUrl,
    method: HttpMethod.POST,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const editEligibilityQuestion = async (
  question: EligibilityQuestion
) => {
  return internalRequest<EligibilityQuestion>({
    url: editEligibilityQuestionUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const editDocumentQuestion = async (question: DocumentQuestion) => {
  return internalRequest<DocumentQuestion>({
    url: editDocumentQuestionUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const editOtherQuestion = async (question: OtherQuestion) => {
  return internalRequest<OtherQuestion>({
    url: editOtherQuestionUrl,
    method: HttpMethod.PATCH,
    authRequired: true,
    body: question as unknown as { [key: string]: unknown }
  })
}

export const removeEligibilityQuestion = async (id: Types.ObjectId) => {
  return internalRequest<EligibilityQuestion>({
    url: removeEligibilityQuestionUrl,
    method: HttpMethod.DELETE,
    authRequired: true,
    body: {
      id
    }
  })
}

export const removeDocumentQuestion = async (id: Types.ObjectId) => {
  return internalRequest<DocumentQuestion>({
    url: removeDocumentQuestionUrl,
    method: HttpMethod.DELETE,
    authRequired: true,
    body: {
      id
    }
  })
}

export const removeOtherQuestion = async (id: Types.ObjectId) => {
  return internalRequest<OtherQuestion>({
    url: removeOtherQuestionUrl,
    method: HttpMethod.DELETE,
    authRequired: true,
    body: {
      id
    }
  })
}
