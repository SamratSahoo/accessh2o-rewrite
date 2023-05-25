import * as React from 'react'
import classes from './EditInfoSubmissionModal.module.css'
import { Modal, Stack, Link } from '@mui/material'

interface PropTypes {
  shouldShowModal: boolean
  onClose: () => void
}

export const EditInfoSubmissionModal = ({
  shouldShowModal,
  onClose
}: PropTypes): JSX.Element => {
  return (
    <div>
      <div>
        <Modal open={shouldShowModal} onClose={onClose}>
          <div className={classes.modalwrapper}>
            <div className={classes.header}>
              <h2>Unsaved Changes</h2>
            </div>
            <div className={classes.textContainer}>
              <p className={classes.text}>
                Leaving this page will discard any changes made.
              </p>
              <p className={classes.textTwo}>
                Do you want to save your changes before going back?
              </p>
            </div>
            <div className={classes.buttonContainer}>
              <Stack direction="row" spacing={2}>
                <Link
                  underline="none"
                  href="javascript:history.back()"
                  className={classes.customerButton}
                >
                  {' '}
                  Discard{' '}
                </Link>
                <button className={classes.saveChange} onClick={onClose}>
                  Save
                </button>
              </Stack>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
