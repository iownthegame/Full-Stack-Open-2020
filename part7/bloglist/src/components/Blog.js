import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { deleteBlog } from '../reducers/blogReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, handleLikeClick, user }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const BlogRef = useRef()

  const toggleVisibility = () => {
    BlogRef.current.toggleVisibility()
    setVisible(!visible)
  }

  const onBlogDelete = (blogObject) => {
    if (!window.confirm(`Remove blog ${blogObject.title}`)) return

    dispatch(deleteBlog(blogObject.id))
  }

  return (
    <div style={blogStyle} className="blog">
      <span className="title">{blog.title}</span> <button className="viewButton" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div>{blog.author}</div>

      <Togglable buttonLabel="" ref={BlogRef}>
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button className="likeButton" onClick={() => handleLikeClick(blog)}>like</button></div>
          {blog.user && user.username === blog.user.username && <button className="removeButton" onClick={() => onBlogDelete(blog)}>remove</button>}
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
