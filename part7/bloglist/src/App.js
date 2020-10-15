import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const showNotification = (type, text, time=3000) => {
    dispatch(setNotification({ type, text }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [dispatch])

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser)
  }

  const handleLikeClick = (blogObject) => {
    const updateBlogObject = {
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }

    dispatch(updateBlog(blogObject.id, updateBlogObject))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        {loginForm()}
      </div>
    )
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick}
          user={user}
        />
      )}
    </div>
  )
}

export default App
