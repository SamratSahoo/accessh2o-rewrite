/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import classes from './InfoSubmissionPage.module.css'
import notestyle from '../../components/NotesModal/NotesModal.module.css'
import {
  ApplicantStatus,
  ApplicantStatusColor,
  DocumentQA,
  OtherQA,
  EligibilityQA,
  Info,
  Status,
  Note,
  Client,
  Applicant
} from 'src/utils/types'
import {
  Checkbox,
  FormLabel,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'
import EditInfoSubmissionModal from 'src/components/EditInfoSubmissionModal'
import { Edit } from '@mui/icons-material'
import Stack from '@mui/material/Stack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import Link from '@mui/material/Link'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { getClient, changeStatus } from 'src/actions/Client'
import { update, getInfo } from 'src/actions/InfoSubmission'
import { addNote, getNote } from 'src/actions/Note'
import { FormErrorModal } from '../../components/FormErrorModal/FormErrorModal'

const setStatusColor = (status: ApplicantStatus): string => {
  return ApplicantStatusColor[status]
}

interface PropTypes {
  applicantId: string
  isUtilityView: boolean
}

const InfoSubmissionView = ({
  applicantId,
  isUtilityView
}: PropTypes): JSX.Element => {
  // Status
  const [accountId, setAccountID] = useState(applicantId)
  const [status, setStatus] = useState(ApplicantStatus.AwaitingUtility)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('Not exist')

  // Notes
  const initArr: Note[] = []
  const [editNote, setEditNote] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [notes, setNotes] = useState(initArr)

  // Form Control
  const [showModal, setShowModal] = useState(false)
  const [showErrorFormModal, setShowErrorModal] = useState(false)
  const [formEditable, setFormEditable] = useState(false)

  // Questions
  const [eligibilityQuestions, setEligibilityQuestions] = useState<
    EligibilityQA[]
  >([])
  const [documentQuestions, setDocumentQuestions] = useState<DocumentQA[]>([])
  const [otherQuestions, setOtherQuestions] = useState<OtherQA[]>([])
  const [oldEligibilityQuestions, setOldEligibilityQuestions] = useState<
    EligibilityQA[]
  >([])
  const [oldDocumentQuestions, setOldDocumentQuestions] = useState<
    DocumentQA[]
  >([])
  const [oldOtherQuestions, setOldOtherQuestions] = useState<OtherQA[]>([])
  const [emptyDocumentQuestions, setEmptyDocumentQuestions] = useState<
    boolean[]
  >([])
  const [emptyOtherQuestions, setEmptyOtherQuestions] = useState<boolean[]>([])
  const [render, setRender] = useState(false)

  useEffect(() => {
    void getapplicants()
    void getNotes()
    void getInfoPack()
    void getEmptyBoxes()
    setRender(false)
  }, [oldEligibilityQuestions, oldDocumentQuestions, oldOtherQuestions, render])

  const getapplicants = async (): Promise<void> => {
    const applicant: Client = await getClient(applicantId)
    console.log(applicant)
    setName(applicant.name)
    setAccountID(applicantId)
    setAddress(applicant.propertyAddress)
    setStatus(applicant.status)
    setPhone(applicant.phone)

    // Something doesn't add up here
    // if ((applicant as Applicant).notes) {
    //     setNotes((applicant as Applicant).notes)
    // }
  }
  const getInfoPack = async (): Promise<void> => {
    const info = await getInfo(applicantId)
    console.log(info)
    setEligibilityQuestions(info.eligibilityQuestions)
    setDocumentQuestions(info.documents)
    setOtherQuestions(info.otherQuestions)
  }

  const getEmptyBoxes = (): void => {
    const document = []
    const other = []
    for (let i = 0; i < otherQuestions.length; i++) {
      if (otherQuestions[i].answer === '') {
        other.push(false)
      } else {
        other.push(true)
      }
    }
    for (let i = 0; i < documentQuestions.length; i++) {
      if (documentQuestions[i].answer === null) {
        document.push(false)
      } else {
        document.push(true)
      }
    }
    setEmptyDocumentQuestions(document)
    setEmptyOtherQuestions(other)
  }

  const updateEligibility = (check: any, index: number): void => {
    const duplicate = eligibilityQuestions.slice()
    duplicate[index].answer = check.target.checked
    setEligibilityQuestions(duplicate)
  }
  const updateDocument = (file: any, index: number): void => {
    const duplicate = documentQuestions.slice()
    console.log(file.target.files[0])

    const reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = () => {
      console.log(reader.result)
      if (reader.result !== null) {
        const f = Buffer.from((reader.result as string).split(',')[1], 'base64')
        console.log(f.toString('base64'))
        /*
                const blob = new Blob([f], { type: 'application/pdf' })
        
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'document.pdf')
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                */

        console.log(duplicate)
        duplicate[index].answer = f
        const emptyDuplicate = emptyDocumentQuestions.slice()
        if (f === null) {
          emptyDuplicate[index] = false
        } else {
          emptyDuplicate[index] = true
        }
        setDocumentQuestions(duplicate)
        setEmptyDocumentQuestions(emptyDuplicate)
      } else throw new Error('File not found')
    }
  }
  const updateOther = (text: any, index: number): void => {
    const duplicate = otherQuestions.slice()
    duplicate[index].answer = text.target.value
    const emptyDuplicate = emptyOtherQuestions.slice()
    if (text.target.value === '') {
      emptyDuplicate[index] = false
    } else {
      emptyDuplicate[index] = true
    }
    setOtherQuestions(duplicate)
    setEmptyOtherQuestions(emptyDuplicate)
  }
  const updateInfo = async (updateDatabase: boolean): Promise<void> => {
    let document = true
    let other = true
    for (let i = 0; i < emptyOtherQuestions.length; i++) {
      if (!emptyOtherQuestions[i]) {
        other = false
      }
    }
    for (let i = 0; i < emptyDocumentQuestions.length; i++) {
      if (!emptyDocumentQuestions[i]) {
        document = false
      }
    }
    if (!document || !other) {
      // add error modal here
      console.log('Answer all questions')
    } else {
      setFormEditable(!formEditable)
      setOldEligibilityQuestions(eligibilityQuestions)
      setOldDocumentQuestions(documentQuestions)
      setOldOtherQuestions(otherQuestions)
      if (updateDatabase) {
        const data: Info = {
          accountId: accountId,
          eligibilityQuestions: eligibilityQuestions,
          documents: documentQuestions,
          otherQuestions: otherQuestions
        }
        await update(data as unknown as { [key: string]: unknown })
        setRender(true)
      }
    }
  }

  const updateStatus = async (newStatus: ApplicantStatus): Promise<void> => {
    setStatus(newStatus)
    const data: Status = {
      accountId: accountId,
      status: newStatus
    }
    await changeStatus(data as unknown as { [key: string]: unknown })
  }

  const addNewNote = async (): Promise<void> => {
    const data: Note = {
      accountID: accountId,
      sender: 'Utility',
      receiver: 'AccessH20',
      date: new Date(),
      message: currentInput
    }
    await addNote(data as unknown as { [key: string]: unknown })
    setNotes(notes.concat(data))
    setCurrentInput('')
  }

  const getNotes = async (): Promise<void> => {
    const data = await getNote(accountId)
    setNotes(notes.concat(data))
  }

  function handleClick(): void {
    setEligibilityQuestions(oldEligibilityQuestions)
    setDocumentQuestions(oldDocumentQuestions)
    setOtherQuestions(oldOtherQuestions)
    setFormEditable(!formEditable)
  }

  function handleBackToDash(): void {
    if (formEditable) {
      setShowModal(formEditable)
    } else {
      window.location.href = 'javascript:history.back()'
    }
  }

  const closeModalHandler = (): void => setShowModal(false)

  const downloadDocument = (index: number): void => {
    const pdf = (documentQuestions[index].answer as any).data
    console.log(pdf)

    const buf = Buffer.from(pdf, 'base64')
    console.log(buf.toString('base64'))

    // const byteCharacters = base64ToArrayBuffer(pdf);
    // console.log(byteCharacters)

    const blob = new Blob([buf], { type: 'application/pdf' })
    console.log(blob)

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'document.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={classes.bacoground}>
      <div className={classes.mainContainer}>
        <div>
          <div className="accountModal">
            <div className={classes.topContainer}>
              <a className={classes.back} onClick={handleBackToDash}>
                &lt;&nbsp;&nbsp;&nbsp;&nbsp;Back to Dashboard
              </a>
              {isUtilityView ? (
                !formEditable ? (
                  <div className={classes.last_item}>
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setFormEditable(!formEditable)}
                      variant="contained"
                      color="primary"
                      style={{
                        textTransform: 'none',
                        background: '#3f78b5',
                        padding: '0.3rem 1.2rem',
                        borderRadius: '8px'
                      }}
                    >
                      Update Info
                    </Button>
                  </div>
                ) : (
                  <div className={classes.last_item}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        type="button"
                        variant="text"
                        style={{
                          textTransform: 'none',
                          padding: '0.3rem 2rem',
                          fontWeight: '400',
                          borderRadius: '8px'
                        }}
                        onClick={handleClick}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{
                          textTransform: 'none',
                          background: '#3f78b5',
                          padding: '0.3rem 2rem',
                          fontWeight: '400',
                          borderRadius: '8px'
                        }}
                        onClick={() => console.log(updateInfo(true))}
                      >
                        Save
                      </Button>
                    </Stack>
                  </div>
                )
              ) : (
                <div></div>
              )}
            </div>
            <EditInfoSubmissionModal
              shouldShowModal={showModal}
              onClose={closeModalHandler}
            />
          </div>
          <h1>{name}</h1>
          <div>
            <div className={classes.header}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing="8rem"
              >
                <Stack direction="column" spacing={2}>
                  <h4 className={classes.headerNoMargin}>Status</h4>
                  <FormControl
                    variant="outlined"
                    sx={{ m: 1, minWidth: '3rem' }}
                  >
                    <Select
                      className={classes.mui}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left'
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left'
                        }
                      }}
                      value={status}
                      style={{
                        borderStyle: 'hidden',
                        backgroundColor: setStatusColor(status),
                        width: '13rem',
                        textAlign: 'center',
                        borderRadius: '8px',
                        height: '2rem'
                      }}
                      onChange={async (e) =>
                        await updateStatus(e.target.value as ApplicantStatus)
                      }
                    >
                      <MenuItem
                        value={ApplicantStatus.AwaitingUtility}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.AwaitingUtility
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Awaiting Utility
                      </MenuItem>
                      <MenuItem
                        value={ApplicantStatus.AwaitingAccessH2O}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.AwaitingAccessH2O
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Awaiting AccessH2O
                      </MenuItem>
                      <MenuItem
                        value={ApplicantStatus.Completed}
                        disabled={isUtilityView}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.Completed
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Completed
                      </MenuItem>
                      <MenuItem
                        value={ApplicantStatus.Approved}
                        disabled={isUtilityView}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.Approved
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Approved
                      </MenuItem>
                      <MenuItem
                        value={ApplicantStatus.Denied}
                        disabled={isUtilityView}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.Denied
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Denied
                      </MenuItem>
                      <MenuItem
                        value={ApplicantStatus.Terminated}
                        disabled={isUtilityView}
                        style={{
                          backgroundColor: setStatusColor(
                            ApplicantStatus.Terminated
                          ),
                          textAlign: 'left',
                          borderRadius: '8px',
                          display: 'flex',
                          margin: '7px'
                        }}
                      >
                        Terminated
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction="column" spacing={2}>
                  <h4 className={classes.headerNoMargin}>Account ID</h4>
                  <p className={classes.headerNoMargin}>{accountId}</p>
                </Stack>
                <Stack direction="column" spacing={2}>
                  <h4 className={classes.headerNoMargin}>Phone Number</h4>
                  <p>{phone}</p>
                </Stack>
                <Stack direction="column" spacing={2}>
                  <h4 className={classes.headerNoMargin}>Address</h4>
                  <p className={classes.headerNoMargin}>{address}</p>
                </Stack>
              </Stack>
            </div>
          </div>
        </div>
        <div className={classes.noteContainer}>
          <h3 className={classes.noteHead}>Notes</h3>
          <div className={classes.noteBody}>
            {notes.map((note) => (
              <div className={classes.stickyNote}>
                <div className={notestyle.noteHeader}>
                  <p className={notestyle.sender}>{note.sender}</p>
                  <p className={notestyle.date}>
                    {new Date(note.date).getMonth() + 1}/
                    {new Date(note.date).getDate()}/
                    {new Date(note.date).getFullYear()}
                  </p>
                </div>
                <p className={classes.message}>{note.message}</p>
              </div>
            ))}
            {editNote ? (
              <Stack direction="column" spacing={2}>
                <TextField
                  id="notesField"
                  label="Add your note here"
                  minRows="5"
                  multiline
                  variant="outlined"
                  style={{ width: '38rem' }}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  value={currentInput}
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    type="button"
                    disabled={currentInput === ''}
                    variant="contained"
                    color="primary"
                    style={{ textTransform: 'none' }}
                    onClick={() => {
                      void addNewNote()
                    }}
                  >
                    Add Note
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    style={{ textTransform: 'none' }}
                    onClick={() => setEditNote(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <a onClick={() => setEditNote(true)} className={classes.addNote}>
                + Add Note
              </a>
            )}
          </div>
        </div>
        <div className={classes.scetionContainer}>
          <h3 className={classes.eligibilityHeader}>Eligibility</h3>
          <div className={classes.eligibilityBody}>
            {eligibilityQuestions.map((info, index) => (
              <div className={classes.eligibilityCheckbox}>
                {formEditable && (
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    checked={info.answer}
                    onChange={(check) => updateEligibility(check, index)}
                    disabled={!formEditable}
                  />
                )}
                {!formEditable && info.answer && (
                  <CheckCircleIcon color="success" />
                )}
                {!formEditable && !info.answer && <CancelIcon color="error" />}
                <div className={classes.eligibilityText}>
                  <h4 className={classes.headerNoMargin}>
                    {info.question.title}
                  </h4>
                  <p style={{ fontWeight: 'lighter' }}>
                    {info.question.question}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.scetionContainer}>
          <h3 className={classes.documentHeader}>Documents</h3>
          <div className={classes.documentBody}>
            {documentQuestions?.map((info, index) => (
              <div className={classes.documentSubmission}>
                <FormLabel
                  style={{ fontWeight: 'bold' }}
                  error={(info.answer as any).data.length === 0}
                  htmlFor="infoAns"
                >
                  {info.question.title}
                </FormLabel>
                <p style={{ fontWeight: 'lighter' }}>
                  {info.question.description}
                </p>
                <div className={classes.submissionStack}>
                  {formEditable && (
                    <Button
                      variant="contained"
                      component="label"
                      disabled={!formEditable}
                      style={{
                        width: '15%',
                        textTransform: 'none',
                        marginRight: '0.5rem',
                        height: '2rem'
                      }}
                    >
                      Upload
                      <input
                        id="info.answer"
                        type="file"
                        hidden
                        onChange={(e) => {
                          if (
                            e.target.files === null ||
                            e.target.files.length < 1
                          ) {
                            alert('Please upload a valid file.')
                          }
                          updateDocument(e, index)
                        }}
                      />
                    </Button>
                  )}

                  {(info.answer as any).data.length !== 0 && (
                    <InsertDriveFileIcon
                      color="primary"
                      onClick={() => downloadDocument(index)}
                    />
                  )}

                  <Link
                    disabled={(info.answer as any).data.length === 0}
                    component="button"
                    className={classes.fileFontColor}
                    onClick={() => downloadDocument(index)}
                  >
                    {info.question.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.additionalContainer}>
          <h3 className={classes.additionalHeader}>Additional</h3>
          <div className={classes.additionalBody}>
            {otherQuestions?.map((info, index) => (
              <div className={classes.inputContainer}>
                <FormLabel style={{ fontWeight: 'bold' }} htmlFor="adjustAns">
                  {info.question.question}
                </FormLabel>
                {formEditable && (
                  <TextField
                    id="adjustAns"
                    value={info.answer}
                    required
                    error={info.answer === ''}
                    minRows="5"
                    multiline
                    variant="outlined"
                    onChange={(text) => updateOther(text, index)}
                    disabled={!formEditable}
                  />
                )}
                {!formEditable && (
                  <p className={classes.additionalfontStyle}>{info.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {formEditable ? (
          <Stack style={{ marginLeft: '12.5rem' }} direction="row" spacing={2}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              style={{
                textTransform: 'none',
                background: '#3f78b5',
                padding: '0.3rem 2rem',
                fontWeight: '400',
                borderRadius: '8px'
              }}
              onClick={() => console.log(updateInfo(true))}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="text"
              style={{
                textTransform: 'none',
                padding: '0.3rem 2rem',
                fontWeight: '400',
                borderRadius: '8px'
              }}
              onClick={handleClick}
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <div></div>
        )}
      </div>
      <FormErrorModal
        shouldShowModal={showErrorFormModal}
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  )
}

export default InfoSubmissionView
