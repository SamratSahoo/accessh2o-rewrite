/* eslint-disable  */

import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { login, getCurrentUser } from 'src/actions/User'
import classes from './LoginPage.module.css'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import { OutlinedInput } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import urls from 'src/utils/urls'

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isRegistering] = useState(false)

  const handleClickShowPassword = (): void => setShowPassword(!showPassword)
  const handleMouseDownPassword = (): void => setShowPassword(!showPassword)

  useEffect(() => {
    async function getInitialInfo() {
      const user = await getCurrentUser()
      if (user) {
        Router.push(urls.pages.accessh2oView.applicants)
      }
    }

    getInitialInfo().then().catch()
  }, [])

  const handleSubmit = (event: { preventDefault: () => void }): any => {
    event.preventDefault()
    return login(email, password)
      .then((result) => {
        localStorage.setItem('accessToken', result)
        Router.push(urls.pages.accessh2oView.applicants)
      })
      .catch((error: { message: string }) => window.alert(error.message))
  }

  return (
    <div className={classes.root}>
      <div className={classes.logo} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.welcomeText}>Welcome!</h2>
        <h3 className={classes.infoText}>
          {isRegistering
            ? 'Register a new account and use our app today!'
            : 'Login to an existing account.'}
        </h3>
        <div className={classes.inputContainer}>
          <label htmlFor="email" className={classes.inputLabel}>
            Email
          </label>
          <TextField
            className={classes.input}
            required
            variant="outlined"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password" className={classes.inputLabel}>
            Password
          </label>
          <OutlinedInput
            className={classes.input}
            required
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <button className={classes.bttn} type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
