import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/signedinUserReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('error', 'wrong username or password')
    }
  }

  const showNotification = (type, text, time=3000) => {
    dispatch(setNotification({ type, text }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label="username"
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          label="password"
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
    </form>
  )
}

export default LoginForm
