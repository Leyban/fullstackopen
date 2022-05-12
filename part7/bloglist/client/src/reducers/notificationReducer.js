import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions

let timeoutID

export const notify = (message, displayTime = 5) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(setNotification(message))
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime * 1000)
  }
}
