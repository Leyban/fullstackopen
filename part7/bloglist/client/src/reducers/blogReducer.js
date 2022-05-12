import { createSlice } from '@reduxjs/toolkit'
import { blogService } from '../services/blogs'
import { errorAlert } from './errorReducer'
import { notify } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return [...state, action.payload]
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
        .sort((a, b) => (a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0))
    },
  },
})

export default blogSlice.reducer
export const { setAll, createBlog, deleteBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return (dispatch) => {
    blogService
      .getAll()
      .then((blogs) =>
        dispatch(
          setAll(
            blogs.sort((a, b) =>
              a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
            )
          )
        )
      )
  }
}

export const submitNewBlog = (newBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(newBlog)
    dispatch(createBlog(returnedBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(likedBlog)
      dispatch(updateBlog(returnedBlog))
      dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(errorAlert(error.message))
    }
  }
}

export const deleteThisBlog = (blog) => {
  const deleteMessage = 'Deleted ' + blog.title + ' by ' + blog.author
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(notify(deleteMessage))
      dispatch(deleteBlog(blog.id))
    } catch (error) {
      if (error.response.request.status === 401) {
        return dispatch(
          errorAlert(
            `Not authorized to delete blog ${blog.title} by ${blog.author}`
          )
        )
      }
      dispatch(errorAlert(`${error.message}`))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const blogComments = [...blog.comments]
    blogComments.push(comment)
    const commentedBlog = { ...blog, comments: blogComments }
    try {
      const returnedBlog = await blogService.comment(commentedBlog)
      dispatch(updateBlog(returnedBlog))
      dispatch(notify(`commented ${comment} on ${blog.title}`))
    } catch (error) {
      dispatch(errorAlert(error.message))
    }
  }
}
