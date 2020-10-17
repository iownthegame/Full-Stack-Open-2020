import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { blogStyle } from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if (!user) {
    return null
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      {sortedBlogs.map(blog =>
        <div key={blog.id} style={blogStyle} >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList
