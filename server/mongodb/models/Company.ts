import { ObjectId } from 'mongodb'
import mongoose, { Schema } from 'mongoose'
import { Company } from 'src/utils/types'

const CompanySchema = new Schema<Company>({
  accountId: {
    type: String,
    required: false,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
})

const CompanyModel =
  (mongoose.models.Company as mongoose.Model<Company>) ||
  mongoose.model<Company>('Company', CompanySchema)
export default CompanyModel
