import dbConnect from 'server/utils/dbConnect'
import NoteModel from 'server/mongodb/models/Note'
import { Note } from 'src/utils/types'

export async function addNote(note: Note): Promise<Note> {
  await dbConnect()
  return await NoteModel.create(note)
}

export async function getNotes(accountID: string): Promise<Note[]> {
  await dbConnect()
  const note = await NoteModel.find({ accountID })
  return note
}
