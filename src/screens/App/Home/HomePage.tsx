import PropTypes from 'prop-types'
import Router from 'next/router'
import { getCurrentUser } from 'src/actions/User'
import urls from 'src/utils/urls'
import { useEffect, useState } from 'react'
import { getAll } from 'src/actions/Client'
import { User } from 'src/utils/types'

const handleLogout = () => {
  localStorage.removeItem('accessToken')
  return Router.replace(urls.pages.login)
}
const handleGetCurrent = async () => {
  const res = await getCurrentUser()
}

const handleGetClients = async () => {
  const applicants = await getAll()
  console.log('HomePage, applicants: ', applicants)
}

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  useEffect(() => {
    async function getUserInfo() {
      const user = await getCurrentUser()
      setCurrentUser(user)
    }

    getUserInfo().then().catch()
  })
  return (
    <div>
      {/* <h2>Welcome to our app, {currentUser.email}!</h2> */}
      <h3>
        This page can only be accessed by logged-in users, because _app.js
        reroutes users who are not logged-in away from this page.
      </h3>
      <button type="button" onClick={() => handleGetCurrent()}>
        Get Current User
      </button>
      <button type="button" onClick={() => handleGetClients()}>
        Get Clients
      </button>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

// HomePage.propTypes = {
//   currentUser: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired
//   }).isRequired
// }

HomePage.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string
  })
}

export default HomePage
