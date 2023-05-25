import mongoose from 'mongoose'
import { Role, User } from 'src/utils/types'

const { Schema } = mongoose

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true,
    enum: Object.values(Role),
    default: []
  },
  utilityCompany: {
    type: String,
    required: false
  }
})

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema)
export default UserModel
