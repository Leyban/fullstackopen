import { createSlice } from '@reduxjs/toolkit'
import { blogService } from '../services/blogs'
import { loginService } from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      localStorage.setItem('loggedInUser', JSON.stringify(action.payload))
      blogService.getToken(action.payload.token)
      return action.payload
    },
    logout() {
      localStorage.removeItem('loggedInUser')
      return null
    },
  },
})

export default userSlice.reducer
export const { login, logout } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const returnedUser = await loginService.login(credentials)
    dispatch(login(returnedUser))
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const savedUser = localStorage.getItem('loggedInUser')
    dispatch(login(JSON.parse(savedUser)))
  }
}
