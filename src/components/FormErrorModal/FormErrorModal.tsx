import * as React from 'react'
import Button from '@material-ui/core/Button'
import classes from './FormErrorModal.module.css'
import Modal from '@mui/material/Modal'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'

interface PropTypes {
  shouldShowModal: boolean
  onClose: () => void
}

export const FormErrorModal = ({
  shouldShowModal,
  onClose
}: PropTypes): JSX.Element => {
  return (
    <div>
      <Modal open={shouldShowModal} onClose={onClose}>
        <div className={classes.modalwrapper}>
          <DoNotDisturbAltIcon color="error" sx={{ fontSize: 100 }} />
          <h2>Please fill out all required sections.</h2>
          <Button
            onClick={onClose}
            variant="contained"
            style={{
              backgroundColor: '#3F78B5',
              color: '#FFFFFF',
              borderRadius: '8px'
            }}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  )
}
