import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/signedinUserReducer'
import { initializeUsers } from './reducers/userReducer'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const matchUser = useRouteMatch('/users/:id')
  const singleUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const singleBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

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

  return (
    <div>
      <Menu user={user} />

      <h2>blog app</h2>
      <Notification />
      {user === null && <LoginForm />}

      <Switch>
        <Route path="/users/:id">
          <User user={singleUser} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={singleBlog} />
        </Route>
        { /* remeber to put '/' path in the end */ }
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
