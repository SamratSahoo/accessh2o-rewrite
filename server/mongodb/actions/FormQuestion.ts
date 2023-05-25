import EligibilityQuestionSchema from '../models/EligibilityQuestion'
import DocumentQuestionSchema from '../models/DocumentQuestion'
import OtherQuestionSchema from '../models/OtherQuestion'
import { Types } from 'mongoose'
import dbConnect from 'server/utils/dbConnect'
import {
  DocumentQuestion,
  EligibilityQuestion,
  OtherQuestion
} from 'src/utils/types'

export async function addEligibilityQuestion(
  question: EligibilityQuestion
): Promise<EligibilityQuestion> {
  await dbConnect()
  return await EligibilityQuestionSchema.create({
    title: question.title,
    question: question.question
  })
}

export async function addDocumentQuestion(
  question: DocumentQuestion
): Promise<DocumentQuestion> {
  await dbConnect()
  return await DocumentQuestionSchema.create({
    title: question.title,
    description: question.description
  })
}

export async function addOtherQuestion(
  question: OtherQuestion
): Promise<OtherQuestion> {
  await dbConnect()
  return await OtherQuestionSchema.create({ question: question.question })
}

export async function getEligibilityQuestions(): Promise<
  EligibilityQuestion[]
> {
  await dbConnect()
  const questions = await EligibilityQuestionSchema.find()
  return questions
}

export async function getDocumentQuestions(): Promise<DocumentQuestion[]> {
  await dbConnect()
  const questions = await DocumentQuestionSchema.find()
  return questions
}

export async function getOtherQuestions(): Promise<OtherQuestion[]> {
  await dbConnect()
  const questions = await OtherQuestionSchema.find()
  return questions
}

export async function editEligibilityQuestion(
  question: EligibilityQuestion
): Promise<EligibilityQuestion> {
  await dbConnect()
  return (await EligibilityQuestionSchema.findByIdAndUpdate(question._id, {
    title: question.title,
    question: question.question
  })) as EligibilityQuestion
}

export async function editDocumentQuestion(
  question: DocumentQuestion
): Promise<DocumentQuestion> {
  await dbConnect()
  return (await DocumentQuestionSchema.findByIdAndUpdate(question._id, {
    title: question.title,
    description: question.description
  })) as DocumentQuestion
}

export async function editOtherQuestion(
  question: OtherQuestion
): Promise<OtherQuestion> {
  await dbConnect()
  return (await OtherQuestionSchema.findByIdAndUpdate(question._id, {
    question: question.question
  })) as OtherQuestion
}

export async function removeEligibilityQuestion(
  questionId: Types.ObjectId
): Promise<EligibilityQuestion> {
  await dbConnect()
  return (await EligibilityQuestionSchema.findByIdAndDelete(
    questionId
  )) as EligibilityQuestion
}

export async function removeDocumentQuestion(
  questionId: Types.ObjectId
): Promise<DocumentQuestion> {
  await dbConnect()
  return (await DocumentQuestionSchema.findByIdAndDelete(
    questionId
  )) as DocumentQuestion
}

export async function removeOtherQuestion(
  questionId: Types.ObjectId
): Promise<OtherQuestion> {
  await dbConnect()
  return (await OtherQuestionSchema.findByIdAndDelete(
    questionId
  )) as OtherQuestion
}
