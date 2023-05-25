import mongoose from 'mongoose'
import { DocumentQuestion } from 'src/utils/types'

const { Schema } = mongoose

const DocumentQuestionSchema = new Schema<DocumentQuestion>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const DocumentQuestionModel =
  (mongoose.models.DocumentQuestion as mongoose.Model<DocumentQuestion>) ||
  mongoose.model<DocumentQuestion>('DocumentQuestion', DocumentQuestionSchema)
export default DocumentQuestionModel
