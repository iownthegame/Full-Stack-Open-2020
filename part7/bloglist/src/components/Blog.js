import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

import { deleteBlog, createBlogComment, updateBlog } from '../reducers/blogReducer'

export const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const CommentLst = ({ comments, id }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const handleCreateComment = async (event) => {
    event.preventDefault()

    const commentObject = { content }
    dispatch(createBlogComment(id, commentObject))
    setContent('')
  }

  return (
    <div>
      <h3>comments</h3>

      <form onSubmit={handleCreateComment}>
        <div>
          <TextField
            id="content"
            type="text"
            value={content}
            name="content"
            onChange={({ target }) => setContent(target.value)}
          />
          <Button variant="contained" color="primary" id="create-button" type="submit">add comment</Button>
        </div>
      </form>

      <ul>
        {comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>
  )
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!blog || !user) {
    return null
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

  const handleBlogDelete = (blogObject) => {
    if (!window.confirm(`Remove blog ${blogObject.title}`)) return

    dispatch(deleteBlog(blogObject.id))
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes} <Button variant="contained" color="primary" className="likeButton" onClick={() => handleLikeClick(blog)}>like</Button></div>
      <div>added by {blog.user && blog.user.username}</div>
      {blog.user && user.username === blog.user.username && <Button variant="contained" color="secondary" className="removeButton" onClick={() => handleBlogDelete(blog)}>remove</Button>}

      <CommentLst comments={blog.comments} id={blog.id} />
    </div>
  )
}

export default Blog
