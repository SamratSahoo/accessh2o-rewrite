import mongoose from 'mongoose'
import { OtherQuestion } from 'src/utils/types'

const { Schema } = mongoose

const OtherQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  }
})

const OtherQuestionModel =
  (mongoose.models.InfoSubmission as mongoose.Model<OtherQuestion>) ||
  mongoose.model<OtherQuestion>('OtherQuestion', OtherQuestionSchema)
export default OtherQuestionModel
