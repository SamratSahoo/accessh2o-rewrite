import mongoose from 'mongoose'
import { Note } from 'src/utils/types'

const { Schema } = mongoose

const NoteSchema = new Schema<Note>({
  accountID: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const NoteModel =
  (mongoose.models.Note as mongoose.Model<Note>) ||
  mongoose.model<Note>('Note', NoteSchema)
export default NoteModel
