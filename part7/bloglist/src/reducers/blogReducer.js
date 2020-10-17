import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.id ? action.updateBlogObject : blog)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = ({ title, author, url }) => {
  return async dispatch => {
    const newBlog = await blogService.create({ title, author, url })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const createBlogComment = (id, commentObject) => {
  return async dispatch => {
    const updateBlogObject = await blogService.createComment(id, commentObject)
    dispatch({
      type: 'UPDATE_BLOG',
      id,
      updateBlogObject
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const updateBlog = (id, updateBlogObject) => {
  return async dispatch => {
    await blogService.update(id, updateBlogObject)
    dispatch({
      type: 'UPDATE_BLOG',
      id,
      updateBlogObject
    })
  }
}

export default blogReducer
