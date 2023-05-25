import mongoose from 'mongoose'
import { EligibilityQuestion } from 'src/utils/types'

const { Schema } = mongoose

const EligibilityQuestionSchema = new Schema<EligibilityQuestion>({
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  }
})

const EligibilityQuestionModel =
  (mongoose.models
    .EligibilityQuestion as mongoose.Model<EligibilityQuestion>) ||
  mongoose.model<EligibilityQuestion>(
    'EligibilityQuestion',
    EligibilityQuestionSchema
  )
export default EligibilityQuestionModel
