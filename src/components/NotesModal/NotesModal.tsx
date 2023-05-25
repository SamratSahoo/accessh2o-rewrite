/* eslint-disable  */

import * as React from 'react'
import classes from './NotesModal.module.css'
import TextField from '@material-ui/core/TextField'
import { Divider, Link } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useState, useEffect } from 'react'
import { Note } from 'src/utils/types'
import { addNote, getNote } from 'src/actions/Note'

interface PropTypes {
  shouldShowModal: boolean
  onClose: () => void
  accountID: string
  infoSubmissionEndpoint: string
}

const starterNote: Note[] = []

export const NotesModal = ({
  shouldShowModal,
  onClose,
  accountID,
  infoSubmissionEndpoint
}: PropTypes): JSX.Element => {
  const [notes, setNotes] = useState(starterNote)
  const [newNote, setNewNote] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  // TODO utilize mongodb action getNotes()
  useEffect(() => {
    const getNotes = async (): Promise<void> => {
      const data = await getNote(accountID)
      setNotes(starterNote.concat(data))
    }
    void getNotes()
  }, [shouldShowModal])

  const handleTextChange = (e: any): void => {
    setNewNote(e.target.value)
  }

  const addNewNote = async (): Promise<void> => {
    const data: Note = {
      accountID: accountID,
      sender: 'Utility',
      receiver: 'AccessH20',
      date: new Date(),
      message: newNote
    }
    await addNote(data as unknown as { [key: string]: unknown })
    setShowAdd(false)
    setNotes(notes.concat(data))
    setNewNote('')
  }

  return (
    <div>
      <div>
        <Modal
          className={classes.modalOverflow}
          open={shouldShowModal}
          onClose={onClose}
        >
          <div className={classes.modalwrapper}>
            <div className={classes.modalheader}>
              <h3>Notes</h3>
              <span onClick={onClose} className={classes.closemodalbtn}>
                &#10799;
              </span>
            </div>
            <div className={classes.modalcontent}>
              <Divider />
              {notes.map((note, index) => (
                <div key={index}>
                  <div className={classes.noteHeader}>
                    <p className={classes.sender}>{note.sender}</p>
                    <p className={classes.date}>
                      {new Date(note.date).getMonth() + 1}/
                      {new Date(note.date).getDate()}/
                      {new Date(note.date).getFullYear()}
                    </p>
                  </div>
                  <p className={classes.message}>{note.message}</p>
                  <Divider />
                </div>
              ))}

              {showAdd ? (
                <div>
                  <div className={classes.newNoteContainer}>
                    <TextField
                      value={newNote}
                      onChange={handleTextChange}
                      variant="outlined"
                      multiline
                      fullWidth
                      minRows={2}
                    />
                  </div>
                  <div className={classes.addNoteButtons}>
                    <button className={classes.saveNote} onClick={addNewNote}>
                      Add Note
                    </button>
                    <button
                      onClick={() => setShowAdd(false)}
                      className={classes.cancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdd(true)}
                  className={classes.plusNote}
                >
                  + Add Note
                </button>
              )}
              <div className={classes.customer}>
                <Link
                  color="white"
                  underline="none"
                  href={infoSubmissionEndpoint + '/' + accountID}
                  className={classes.customerButton}
                >
                  View Customer Info
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
