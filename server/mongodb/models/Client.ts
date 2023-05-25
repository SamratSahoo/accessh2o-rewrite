import mongoose, { Schema } from 'mongoose'
import { ApplicantStatus, Client } from 'src/utils/types'

const ClientSchema = new Schema<Client>({
  accountId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  utilityCompanyId: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  utilityCompany: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ApplicantStatus,
    required: true
  },
  propertyAddress: {
    type: String,
    required: true
  },
  applied: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  documents: {
    type: Array<File>,
    required: false
  }
})

const ClientModel =
  (mongoose.models.Client as mongoose.Model<Client>) ||
  mongoose.model<Client>('Client', ClientSchema)
export default ClientModel
