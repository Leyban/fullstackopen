import { createSlice } from '@reduxjs/toolkit'
import { userService } from '../services/user'

const userListSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload
    },
    populateUsers(state, action) {
      const blogs = action.payload
      state.map((user) => {
        const blogsByUser = blogs.filter((blog) => blog.user.id === user.id)
        user.blogs = blogsByUser
        user.blogcount = blogsByUser.length
      })
    },
  },
})

export default userListSlice.reducer
export const { setAll, populateUsers } = userListSlice.actions

export const initializeUserList = (blogs) => {
  return async (dispatch) => {
    const response = await userService.getAll()
    dispatch(setAll(response))
    dispatch(populateUsers(blogs))
  }
}
