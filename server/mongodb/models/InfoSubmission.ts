import mongoose, { Schema } from 'mongoose'
import { InfoSubmission } from 'src/utils/types'

const InfoSubmissionSchema = new Schema<InfoSubmission>({
  accountId: {
    type: String,
    required: true
  },
  eligibilityQuestions: {
    type: [
      {
        question: {
          title: String,
          question: String
        },
        answer: Boolean
      }
    ],
    required: false
  },
  documents: {
    type: [
      {
        question: {
          title: String,
          description: String
        },
        answer: Buffer
      }
    ],
    required: false
  },
  otherQuestions: {
    type: [
      {
        question: {
          question: String
        },
        answer: String
      }
    ],
    required: false
  }
})

const InfoSubmissionModel =
  (mongoose.models.InfoSubmission as mongoose.Model<InfoSubmission>) ||
  mongoose.model<InfoSubmission>('InfoSubmission', InfoSubmissionSchema)
export default InfoSubmissionModel
