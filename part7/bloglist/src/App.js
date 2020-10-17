import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import Blog, { blogStyle } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/signedinUserReducer'
import { initializeUsers } from './reducers/userReducer'

import './App.css'

const BlogList = ({ blogs, user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle} >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

const Users = ({ users, user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const showNotification = (type, text, time=3000) => {
    dispatch(setNotification({ type, text }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
    dispatch(clearUser())
  }

  const handleLikeClick = (blogObject) => {
    const updateBlogObject = {
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
      id: blogObject.id,
      comments: blogObject.comments,
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

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  const matchUser = useRouteMatch('/users/:id')
  const singleUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const singleBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  const padding = { padding: 5 }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user && <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>}
      </div>

      <h2>blog app</h2>
      <Notification />
      {user === null && loginForm()}

      <Switch>
        <Route path="/users/:id">
          <User user={singleUser} />
        </Route>
        <Route path="/users">
          <Users users={users} user={user} />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            blog={singleBlog}
            handleLikeClick={handleLikeClick}
            user={user}
          />
        </Route>
        { /* remeber to put '/' path in the end */ }
        <Route path="/">
          <BlogList blogs={sortedBlogs} user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
