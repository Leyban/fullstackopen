import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'I am the greatest Notification in the World',
    reducers: {
        notify(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const { notify, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer


let timeoutID

export const setNotification = (message, displayTime = 5) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch(notify(message))
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, displayTime * 1000)
    }
}