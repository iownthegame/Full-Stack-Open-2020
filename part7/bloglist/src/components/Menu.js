import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'

import { clearUser } from '../reducers/signedinUserReducer'

const padding = { padding: 5 }

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="users">
          users
        </Button>
        {user && <Button color="inherit">
          <span>{user.name} logged in <Button variant="contained" onClick={handleLogout}>logout</Button></span>
        </Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
