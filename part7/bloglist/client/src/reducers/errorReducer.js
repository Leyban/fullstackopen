import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: null,
  reducers: {
    setErrorMessage(state, action) {
      return action.payload
    },
    clearErrorMessage() {
      return null
    },
  },
})

export default errorMessageSlice.reducer
export const { setErrorMessage, clearErrorMessage } = errorMessageSlice.actions

let timeoutID

export const errorAlert = (message, displayTime = 5) => {
  return (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(setErrorMessage(message))
    timeoutID = setTimeout(() => {
      dispatch(clearErrorMessage())
    }, displayTime * 1000)
  }
}
