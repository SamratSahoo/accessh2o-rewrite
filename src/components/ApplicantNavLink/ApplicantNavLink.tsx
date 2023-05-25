import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import classes from './ApplicantNavLink.module.css'
import { UtilityPartnerModal } from 'src/components/UtilityPartnerModal/UtilityPartnerModal'
import { useState } from 'react'
import urls from 'src/utils/urls'
import { Link } from '@mui/material'
import Router from 'next/router'

interface PropTypes {
  isUtilityView: boolean
}

const ApplicantNavLink = ({ isUtilityView }: PropTypes): JSX.Element => {
  const [auth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [showUtilityPartnerModal, setShowUtilityPartnerModal] = useState(false)

  const handleMenu = (event: any): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('accessToken')
    await Router.replace(urls.pages.login)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className={classes.root}
      >
        <Toolbar>
          <div className={classes.logo1} />
          <div className={classes.logo2} />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mx: 'auto' }}
          ></IconButton>
          {!isUtilityView && (
            <span className={classes.editForm}>
              <Link
                href="/accessh2oView/editform"
                underline="none"
                color="inherit"
              >
                Edit Form
              </Link>
            </span>
          )}
          {!isUtilityView && (
            <span
              onClick={() => setShowUtilityPartnerModal(true)}
              className={classes.addPartner}
            >
              Add Utility Partner
            </span>
          )}
          <UtilityPartnerModal
            shouldShowModal={showUtilityPartnerModal}
            onClose={() => setShowUtilityPartnerModal(false)}
          />

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle
                  color="disabled"
                  className={classes.profilebutton}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component="a"
                  // href={urls.pages.profile + '/' + isUtilityView.toString()}
                  href={urls.pages.profile}
                >
                  {' '}
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ApplicantNavLink
