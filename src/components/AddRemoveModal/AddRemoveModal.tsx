import * as React from 'react'
import Button from '@material-ui/core/Button'
import classes from './AddRemoveModal.module.css'
import Modal from '@mui/material/Modal'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

interface PropTypes {
  name: string
  isSuccessful: boolean
  modalAction: string
  shouldShowModal: boolean
  onClose: () => void
}

export const AddRemoveModal = ({
  name,
  isSuccessful,
  modalAction,
  shouldShowModal,
  onClose
}: PropTypes): JSX.Element => {
  return (
    <div>
      <Modal open={shouldShowModal} onClose={onClose}>
        <div className={classes.modalwrapper}>
          {!isSuccessful && (
            <DeleteForeverOutlinedIcon color="error" sx={{ fontSize: 50 }} />
          )}
          {isSuccessful && (
            <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 50 }} />
          )}
          <h2>
            {name} has been successfully {modalAction}!
          </h2>
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
