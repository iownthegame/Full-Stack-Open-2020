import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/signedinUserReducer'

const padding = { padding: 5 }

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user && <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>}
    </div>
  )
}

export default Menu
