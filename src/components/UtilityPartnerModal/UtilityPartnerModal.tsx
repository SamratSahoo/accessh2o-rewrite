import classes from './UtilityPartnerModal.module.css'
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  Dialog
} from '@material-ui/core'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { signUp } from 'src/actions/User'

interface PropTypes {
  shouldShowModal: boolean
  onClose: () => void
}

export const UtilityPartnerModal = ({
  shouldShowModal,
  onClose
}: PropTypes): JSX.Element => {
  const [showAdd, setShowAdd] = useState(true)

  const [companyN, setCompanyN] = useState('')
  const [newemail, setEmail] = useState('')
  const [newphone, setPhone] = useState('')
  const [newpassword, setPassword] = useState('')
  const [newconfirmpassword, setConfirmPassword] = useState('')

  const addPartner = async (): Promise<void> => {
    // TODO: implement backend submissions
    setPhone(newphone)
    await signUp(newemail, newpassword, companyN)
    setShowAdd(false)
  }

  const finished = (): void => {
    setShowAdd(true)
    onClose()
  }
  return (
    <Dialog
      className={classes.modalOverflow}
      open={shouldShowModal}
      onClose={onClose}
    >
      {showAdd ? (
        <div className={classes.modalWrapper}>
          <div className={classes.modalHeader}>
            <h1 style={{ fontFamily: 'Arial' }}> Add Utility Partner</h1>
            <span onClick={onClose} className={classes.closeButton}>
              &times;
            </span>
          </div>
          <div className={classes.modalContent}>
            <FormControl>
              <div className={classes.inputContainer}>
                <label htmlFor="company" style={{ fontFamily: 'Arial' }}>
                  Company Name
                </label>
                <TextField
                  required
                  variant="outlined"
                  id="company"
                  onChange={(e) => setCompanyN(e.target.value)}
                />
              </div>
              <div className={classes.rowContainer}>
                <div className={classes.inputContainer}>
                  <label htmlFor="email" style={{ fontFamily: 'Arial' }}>
                    Email Address
                  </label>
                  <TextField
                    required
                    variant="outlined"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <label htmlFor="phone" style={{ fontFamily: 'Arial' }}>
                    Phone Number
                  </label>
                  <TextField
                    required
                    variant="outlined"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes.rowContainer}>
                <div className={classes.inputContainer}>
                  <label htmlFor="password" style={{ fontFamily: 'Arial' }}>
                    Password
                  </label>
                  <TextField
                    required
                    variant="outlined"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <label
                    htmlFor="confirmpassword"
                    style={{ fontFamily: 'Arial' }}
                  >
                    Confirm Password
                  </label>
                  <TextField
                    required
                    variant="outlined"
                    id="confirmpassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {newpassword.length < 8 && (
                <FormLabel
                  style={{ fontWeight: 'bold', marginTop: '2rem' }}
                  error
                >
                  * The password you entered must contains at least 8 characters
                </FormLabel>
              )}
              {newpassword !== newconfirmpassword && (
                <FormLabel
                  style={{ fontWeight: 'bold', marginTop: '2rem' }}
                  error
                >
                  * The password you entered do not match, please check your
                  input again
                </FormLabel>
              )}
              <Stack
                className={classes.formSubmitContainer}
                direction="row-reverse"
                alignItems="flex-end"
                spacing={2}
              >
                <Button
                  variant="contained"
                  onClick={addPartner}
                  style={{
                    backgroundColor: '#3F78B5',
                    color: '#FFFFFF',
                    borderRadius: '8px'
                  }}
                >
                  Add Utility Partner
                </Button>
                <Button variant="text" onClick={() => onClose()}>
                  Cancel
                </Button>
              </Stack>
            </FormControl>
          </div>
        </div>
      ) : (
        <div className={classes.modalWrapper2}>
          <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 50 }} />
          <h2>Utility Partner {companyN} has been successfully added!</h2>
          <Button
            onClick={finished}
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
      )}
    </Dialog>
  )
}
