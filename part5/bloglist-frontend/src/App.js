import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import { blogService } from './services/blogs'
import { loginService } from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const formRef = useRef()

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      blogService.getToken(JSON.parse(savedUser).token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0)))
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const returnedUser = await loginService.login({ username, password })

      setErrorMessage(null)
      localStorage.setItem('loggedInUser', JSON.stringify(returnedUser))
      blogService.getToken(returnedUser.token)
      setUser(returnedUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Invalid username or password')
      setInterval(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser')
  }

  const handleCreate = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      formRef.current.toggleVisibility()
      setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setBlogs(blogs.concat(returnedBlog))
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('title, author, and url required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const likedBlog = blogs.find(blog => blog.id === id)
    likedBlog.likes += 1
    try {
      await blogService.update(likedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : likedBlog)
        .sort((a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0)))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log in to the application</h1>
      {errorMessage !== null && <div className='error'>{errorMessage}</div>}
      <div>
        username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>Enter</button>
    </form>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      <p>{`${user.name} logged in`}</p><button onClick={handleLogout}>logout</button>

      <h2>create new</h2>
      <Togglable buttonLabel='create' ref={formRef}>
        <BlogForm submitNewBlog={handleCreate} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
    </div>
  )
}

export default App
