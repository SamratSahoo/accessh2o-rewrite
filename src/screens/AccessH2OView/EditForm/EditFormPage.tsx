import { Button, Divider, Link, TextField } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import React, { useEffect, useState } from 'react'
import classes from './EditForm.module.css'
import {
  buttonStyles,
  linkStyle,
  dividerStyle,
  deleteStyle
} from './EditFormMUIStyles'

import {
  EligibilityQuestion,
  DocumentQuestion,
  OtherQuestion
} from 'src/utils/types'
import {
  addDocumentQuestion,
  addEligibilityQuestion,
  addOtherQuestion,
  editDocumentQuestion,
  editEligibilityQuestion,
  editOtherQuestion,
  getDocumentQuestions,
  getEligibilityQuestions,
  getOtherQuestions,
  removeDocumentQuestion,
  removeEligibilityQuestion,
  removeOtherQuestion
} from 'src/actions/FormQuestions'
import { Types } from 'mongoose'

const EditFormPage = (): JSX.Element => {
  const [eligibilityQuestions, setEligibilityQuestions] = useState<
    EligibilityQuestion[]
  >([])
  const [oldEligibilityQuestions, setOldEligibilityQuestions] = useState<
    EligibilityQuestion[]
  >([])
  const [editEligibility, setEditEligibility] = useState<boolean[]>([])
  const [newEligibilityTitle, setNewEligibilityTitle] = useState('')
  const [newEligibilityQuestion, setNewEligibilityQuestion] = useState('')
  const [showNewEligibility, setShowNewEligibility] = useState(false)

  const [documentQuestions, setDocumentQuestions] = useState<
    DocumentQuestion[]
  >([])
  const [oldDocumentQuestions, setOldDocumentQuestions] = useState<
    DocumentQuestion[]
  >([])
  const [editDocument, setEditDocument] = useState<boolean[]>([])
  const [newDocumentTitle, setNewDocumentTitle] = useState('')
  const [newDocumentDescription, setNewDocumentDescription] = useState('')
  const [showNewDocument, setShowNewDocument] = useState(false)

  const [otherQuestions, setOtherQuestions] = useState<OtherQuestion[]>([])
  const [oldOtherQuestions, setOldOtherQuestions] = useState<OtherQuestion[]>(
    []
  )
  const [editOther, setEditOther] = useState<boolean[]>([])
  const [newOtherQuestion, setNewOtherQuestion] = useState('')
  const [showNewOther, setShowNewOther] = useState(false)

  const [render, setRender] = useState(false)

  useEffect(() => {
    void getQuestions()
    setRender(false)
  }, [render])

  const getQuestions = async (): Promise<void> => {
    const eligibility = await getEligibilityQuestions()
    const document = await getDocumentQuestions()
    const other = await getOtherQuestions()

    const editeligibility = []
    const editdocument = []
    const editother = []

    for (let i = 0; i < eligibility.length; i++) {
      editeligibility.push(true)
    }
    for (let i = 0; i < document.length; i++) {
      editdocument.push(true)
    }
    for (let i = 0; i < other.length; i++) {
      editother.push(true)
    }
    setEligibilityQuestions(eligibility)
    setDocumentQuestions(document)
    setOtherQuestions(other)
    setEditEligibility(editeligibility)
    setEditDocument(editdocument)
    setEditOther(editother)
  }

  const enableEditEligibility = (index: number, cancel: boolean): void => {
    if (cancel) {
      setEligibilityQuestions(oldEligibilityQuestions)
      setRender(true)
    } else {
      setOldEligibilityQuestions(eligibilityQuestions)
    }
    const duplicate = editEligibility.slice()
    duplicate[index] = !duplicate[index]
    setEditEligibility(duplicate)
  }
  const updateEligibilityQuestion = (
    index: number,
    id: Types.ObjectId
  ): void => {
    if (
      eligibilityQuestions[index].title === '' ||
      eligibilityQuestions[index].question === ''
    ) {
      // insert error modal here
    } else {
      const updateQuestion = async (): Promise<void> => {
        await editEligibilityQuestion({
          _id: id,
          title: eligibilityQuestions[index].title,
          question: eligibilityQuestions[index].question
        })
      }
      void updateQuestion()
      enableEditEligibility(index, false)
    }
  }
  const addNewEligibilityQuestion = (): void => {
    if (newEligibilityTitle === '' || newEligibilityQuestion === '') {
      // insert error modal here
    } else {
      const addQuestion = async (): Promise<void> => {
        await addEligibilityQuestion({
          title: newEligibilityTitle,
          question: newEligibilityQuestion
        })
      }
      void addQuestion()
      setShowNewEligibility(false)
      setNewEligibilityTitle('')
      setNewEligibilityQuestion('')
      setRender(true)

      const duplicate = editEligibility.slice()
      duplicate.push(true)
      setEditEligibility(duplicate)
    }
  }
  const handleEligibilityTitleChange = (
    text: any,
    id: Types.ObjectId,
    index: number
  ): void => {
    const duplicate = eligibilityQuestions.slice()
    duplicate[index].title = text.target.value
    setEligibilityQuestions(duplicate)
  }
  const handleNewEligibilityTitleChange = (text: any): void => {
    setNewEligibilityTitle(text.target.value)
  }
  const handleEligibilityQuestionChange = (
    text: any,
    id: Types.ObjectId,
    index: number
  ): void => {
    const duplicate = eligibilityQuestions.slice()
    duplicate[index].question = text.target.value
    setEligibilityQuestions(duplicate)
  }
  const handleNewEligibilityQuestionChange = (text: any): void => {
    setNewEligibilityQuestion(text.target.value)
  }
  const deleteEligibilityQuestion = (
    id: Types.ObjectId,
    index: number
  ): void => {
    const removeQuestion = async (): Promise<void> => {
      await removeEligibilityQuestion(id)
    }
    void removeQuestion()
    setRender(true)

    const duplicate = editEligibility.slice()
    duplicate.splice(index, 1)
    setEditEligibility(duplicate)
  }
  const enableShowNewEligibility = (): void => {
    setShowNewEligibility(false)
    setNewEligibilityTitle('')
    setNewEligibilityQuestion('')
  }

  const enableEditDocument = (index: number, cancel: boolean): void => {
    if (cancel) {
      setDocumentQuestions(oldDocumentQuestions)
      setRender(true)
    } else {
      setOldDocumentQuestions(documentQuestions)
    }
    const duplicate = editDocument.slice()
    duplicate[index] = !duplicate[index]
    setEditDocument(duplicate)
  }
  const updateDocumentQuestion = (index: number, id: Types.ObjectId): void => {
    if (
      documentQuestions[index].title === '' ||
      documentQuestions[index].description === ''
    ) {
      // insert error modal here
    } else {
      const updateQuestion = async (): Promise<void> => {
        await editDocumentQuestion({
          _id: id,
          title: documentQuestions[index].title,
          description: documentQuestions[index].description
        })
      }
      void updateQuestion()
      enableEditDocument(index, false)
    }
  }
  const addNewDocumentQuestion = (): void => {
    if (newDocumentTitle === '' || newDocumentDescription === '') {
      // insert error modal here
    } else {
      const addQuestion = async (): Promise<void> => {
        await addDocumentQuestion({
          title: newDocumentTitle,
          description: newDocumentDescription
        })
      }
      void addQuestion()
      setShowNewDocument(false)
      setNewDocumentTitle('')
      setNewDocumentDescription('')
      setRender(true)

      const duplicate = editDocument.slice()
      duplicate.push(true)
      setEditDocument(duplicate)
    }
  }
  const handleDocumentTitleChange = (
    text: any,
    id: Types.ObjectId,
    index: number
  ): void => {
    const duplicate = documentQuestions.slice()
    duplicate[index].title = text.target.value
    setDocumentQuestions(duplicate)
  }
  const handleNewDocumentTitleChange = (text: any): void => {
    setNewDocumentTitle(text.target.value)
  }
  const handleDocumentDescriptionChange = (
    text: any,
    id: Types.ObjectId,
    index: number
  ): void => {
    const duplicate = documentQuestions.slice()
    duplicate[index].description = text.target.value
    setDocumentQuestions(duplicate)
  }
  const handleNewDocumentDescriptionChange = (text: any): void => {
    setNewDocumentDescription(text.target.value)
  }
  const deleteDocumentQuestion = (id: Types.ObjectId, index: number): void => {
    const removeQuestion = async (): Promise<void> => {
      await removeDocumentQuestion(id)
    }
    void removeQuestion()
    setRender(true)

    const duplicate = editDocument.slice()
    duplicate.splice(index, 1)
    setEditDocument(duplicate)
  }
  const enableShowNewDocument = (): void => {
    setShowNewDocument(false)
    setNewDocumentTitle('')
    setNewDocumentDescription('')
  }

  const enableEditOther = (index: number, cancel: boolean): void => {
    if (cancel) {
      setOtherQuestions(oldOtherQuestions)
      setRender(true)
    } else {
      setOldOtherQuestions(otherQuestions)
    }
    const duplicate = editOther.slice()
    duplicate[index] = !duplicate[index]
    setEditOther(duplicate)
  }
  const updateOtherQuestion = (index: number, id: Types.ObjectId): void => {
    if (otherQuestions[index].question === '') {
      // insert error modal here
    } else {
      const updateQuestion = async (): Promise<void> => {
        await editOtherQuestion({
          _id: id,
          question: otherQuestions[index].question
        })
      }
      void updateQuestion()
      enableEditOther(index, false)
    }
  }
  const addNewOtherQuestion = (): void => {
    if (newOtherQuestion === '') {
      // insert error modal here
    } else {
      const addQuestion = async (): Promise<void> => {
        await addOtherQuestion({
          question: newOtherQuestion
        })
      }
      void addQuestion()
      setShowNewOther(false)
      setNewOtherQuestion('')
      setRender(true)

      const duplicate = editOther.slice()
      duplicate.push(true)
      setEditOther(duplicate)
    }
  }
  const handleOtherQuestionChange = (
    text: any,
    id: Types.ObjectId,
    index: number
  ): void => {
    const duplicate = otherQuestions.slice()
    duplicate[index].question = text.target.value
    setOtherQuestions(duplicate)
  }
  const handleNewOtherQuestionChange = (text: any): void => {
    setNewOtherQuestion(text.target.value)
  }
  const deleteOtherQuestion = (id: Types.ObjectId, index: number): void => {
    const removeQuestion = async (): Promise<void> => {
      await removeOtherQuestion(id)
    }
    void removeQuestion()
    setRender(true)

    const duplicate = editOther.slice()
    duplicate.splice(index, 1)
    setEditOther(duplicate)
  }
  const enableShowNewOther = (): void => {
    setShowNewOther(false)
    setNewOtherQuestion('')
  }

  return (
    <div className={classes.background}>
      <div className={classes.body}>
        <Link
          href="javascript:history.back()"
          underline="none"
          style={linkStyle}
        >
          {'<'} Back to Dashboard
        </Link>
        <h1 className={classes.pageTitle}>Edit Form</h1>
        <div className={classes.questionType}>
          <h3 className={classes.sectionTitle}>Eligibility</h3>
          <div className={classes.statusSection}>
            {eligibilityQuestions?.map((question, index) => (
              <div className={classes.questions} key={index}>
                <CreateIcon
                  className={classes.editButton}
                  onClick={() => enableEditEligibility(index, false)}
                />
                {editEligibility[index] ? (
                  <div>
                    <p className={classes.title}>{question.title}</p>
                    <p className={classes.description}>{question.question}</p>
                  </div>
                ) : (
                  <div>
                    <div className={classes.editQuestions}>
                      <div className={classes.delete}>
                        <TextField
                          InputProps={{
                            classes: {
                              root: classes.inputRoot
                            }
                          }}
                          value={question.title}
                          onChange={(title) =>
                            handleEligibilityTitleChange(
                              title,
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                          fullWidth
                          multiline
                          size="small"
                        />
                        <DeleteForeverIcon
                          sx={deleteStyle}
                          onClick={() =>
                            deleteEligibilityQuestion(
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                        />
                      </div>
                      <TextField
                        InputProps={{
                          classes: {
                            root: classes.inputRoot
                          }
                        }}
                        value={question.question}
                        onChange={(text) =>
                          handleEligibilityQuestionChange(
                            text,
                            question._id as Types.ObjectId,
                            index
                          )
                        }
                        fullWidth
                        multiline
                        size="small"
                      />
                    </div>
                    <Button
                      onClick={() =>
                        updateEligibilityQuestion(
                          index,
                          question._id as Types.ObjectId
                        )
                      }
                      sx={buttonStyles}
                      variant="contained"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => enableEditEligibility(index, true)}
                      sx={buttonStyles}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {showNewEligibility ? (
              <div className={classes.editQuestionsContainer}>
                <div>
                  <TextField
                    InputProps={{
                      classes: {
                        root: classes.inputRoot
                      }
                    }}
                    value={newEligibilityTitle}
                    onChange={(text) => handleNewEligibilityTitleChange(text)}
                    multiline
                    fullWidth
                    label="Question Title"
                    size="small"
                  />
                  <TextField
                    InputProps={{
                      classes: {
                        root: classes.inputRoot
                      }
                    }}
                    value={newEligibilityQuestion}
                    onChange={(text) =>
                      handleNewEligibilityQuestionChange(text)
                    }
                    multiline
                    fullWidth
                    label="Add brief description of required question"
                    size="small"
                  />
                </div>
                <Button
                  onClick={addNewEligibilityQuestion}
                  sx={buttonStyles}
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  onClick={enableShowNewEligibility}
                  sx={buttonStyles}
                  variant="text"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowNewEligibility(true)}
                sx={buttonStyles}
                variant="outlined"
              >
                + Add Requirement
              </Button>
            )}
          </div>
        </div>
        <Divider style={dividerStyle} />
        <div className={classes.questionType}>
          <h3 className={classes.sectionTitle}>Documents</h3>
          <div className={classes.docSection}>
            {documentQuestions?.map((question, index) => (
              <div className={classes.questions} key={index}>
                <CreateIcon
                  className={classes.editButton}
                  onClick={() => enableEditDocument(index, false)}
                />
                {editDocument[index] ? (
                  <div>
                    <p className={classes.title}>{question.title}</p>
                    <p className={classes.description}>
                      {question.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className={classes.editQuestions}>
                      <div className={classes.delete}>
                        <TextField
                          InputProps={{
                            classes: {
                              root: classes.inputRoot
                            }
                          }}
                          value={question.title}
                          onChange={(title) =>
                            handleDocumentTitleChange(
                              title,
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                          multiline
                          fullWidth
                          size="small"
                        />
                        <DeleteForeverIcon
                          sx={deleteStyle}
                          onClick={() =>
                            deleteDocumentQuestion(
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                        />
                      </div>
                      <TextField
                        InputProps={{
                          classes: {
                            root: classes.inputRoot
                          }
                        }}
                        value={question.description}
                        onChange={(description) =>
                          handleDocumentDescriptionChange(
                            description,
                            question._id as Types.ObjectId,
                            index
                          )
                        }
                        multiline
                        fullWidth
                        size="small"
                      />
                    </div>
                    <Button
                      onClick={() =>
                        updateDocumentQuestion(
                          index,
                          question._id as Types.ObjectId
                        )
                      }
                      sx={buttonStyles}
                      variant="contained"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => enableEditDocument(index, true)}
                      sx={buttonStyles}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {showNewDocument ? (
              <div className={classes.editQuestionsContainer}>
                <div>
                  <TextField
                    InputProps={{
                      classes: {
                        root: classes.inputRoot
                      }
                    }}
                    value={newDocumentTitle}
                    onChange={(text) => handleNewDocumentTitleChange(text)}
                    multiline
                    fullWidth
                    label="Document Title"
                    size="small"
                  />
                  <TextField
                    InputProps={{
                      classes: {
                        root: classes.inputRoot
                      }
                    }}
                    value={newDocumentDescription}
                    onChange={(text) =>
                      handleNewDocumentDescriptionChange(text)
                    }
                    multiline
                    fullWidth
                    label="Add brief description of required document"
                    size="small"
                  />
                </div>
                <Button
                  onClick={addNewDocumentQuestion}
                  sx={buttonStyles}
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  onClick={enableShowNewDocument}
                  sx={buttonStyles}
                  variant="text"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowNewDocument(true)}
                sx={buttonStyles}
                variant="outlined"
              >
                + Add Document Requirement
              </Button>
            )}
          </div>
        </div>
        <Divider style={dividerStyle} />
        <div className={classes.questionType}>
          <h3 className={classes.sectionTitle}>Additional</h3>
          <div className={classes.additSection}>
            {otherQuestions?.map((question, index) => (
              <div className={classes.questions} key={index}>
                <CreateIcon
                  className={classes.editButton}
                  onClick={() => enableEditOther(index, false)}
                />
                {editOther[index] ? (
                  <div>
                    <p className={classes.title}>{question.question}</p>
                  </div>
                ) : (
                  <div>
                    <div className={classes.editQuestions}>
                      <div className={classes.delete}>
                        <TextField
                          InputProps={{
                            classes: {
                              root: classes.inputRoot
                            }
                          }}
                          value={question.question}
                          onChange={(text) =>
                            handleOtherQuestionChange(
                              text,
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                          multiline
                          fullWidth
                          size="small"
                        />
                        <DeleteForeverIcon
                          sx={deleteStyle}
                          onClick={() =>
                            deleteOtherQuestion(
                              question._id as Types.ObjectId,
                              index
                            )
                          }
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        updateOtherQuestion(
                          index,
                          question._id as Types.ObjectId
                        )
                      }
                      sx={buttonStyles}
                      variant="contained"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => enableEditOther(index, true)}
                      sx={buttonStyles}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {showNewOther ? (
              <div className={classes.editQuestionsContainer}>
                <div>
                  <TextField
                    InputProps={{
                      classes: {
                        root: classes.inputRoot
                      }
                    }}
                    value={newOtherQuestion}
                    onChange={(text) => handleNewOtherQuestionChange(text)}
                    multiline
                    fullWidth
                    label="Add brief description of required question"
                    size="small"
                  />
                </div>
                <Button
                  onClick={addNewOtherQuestion}
                  sx={buttonStyles}
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  onClick={enableShowNewOther}
                  sx={buttonStyles}
                  variant="text"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowNewOther(true)}
                sx={buttonStyles}
                variant="outlined"
              >
                + Add Question
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditFormPage
