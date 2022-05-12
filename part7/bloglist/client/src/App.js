import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notificationReducer'
import Bloglist from './components/Bloglist'
import { submitNewBlog } from './reducers/blogReducer'
import { errorAlert } from './reducers/errorReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUserList } from './reducers/userListReducer'
import LoginForm from './components/LoginForm'
import { Routes, Route, useMatch } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserList from './components/UserList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const formRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [])
  useEffect(() => {
    dispatch(initializeUserList(blogs))
  }, [blogs])

  const handleCreate = (newBlog) => {
    try {
      dispatch(submitNewBlog(newBlog))
      formRef.current.toggleVisibility()
      dispatch(notify(`A new blog ${newBlog.title} by ${newBlog.author} added`))
    } catch (error) {
      dispatch(errorAlert('Title, author, and url required'))
    }
  }

  const returnUserDetails = () => {
    const userDetailed = matchUser
      ? users.find((user) => user.id === matchUser.params.id)
      : null

    return <User userDetailed={userDetailed} />
  }

  const returnBlogDetails = () => {
    const blogDetailed = matchBlog
      ? blogs.find((blog) => blog.id === matchBlog.params.id)
      : null

    return <BlogDetails blog={blogDetailed} />
  }

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <Navbar />
      <h2>blog app</h2>
      <Notification />
      <Error />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>create new</h2>
              <Togglable buttonLabel="create" ref={formRef}>
                <BlogForm submitNewBlog={handleCreate} />
              </Togglable>
              <Bloglist />
            </div>
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={returnUserDetails()} />
        <Route path="/blogs/:id" element={returnBlogDetails()} />
      </Routes>
    </div>
  )
}

export default App
