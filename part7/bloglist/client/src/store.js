import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import errorReducer from './reducers/errorReducer'
import notificationReducer from './reducers/notificationReducer'
import userListReducer from './reducers/userListReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorMessage: errorReducer,
    blogs: blogReducer,
    user: userReducer,
    users: userListReducer,
  },
})

export default store
