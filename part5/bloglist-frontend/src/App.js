import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import { blogService } from './services/blogs'
import { loginService } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      blogService.getToken(JSON.parse(savedUser).token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      }, 5000);
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser')
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create({ title, author, url })
      setNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setBlogs(blogs.concat(returnedBlog))
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setErrorMessage('title, author, and url required')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
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

  const createBlogForm = () => (
    <form>
      <div>title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" onClick={handleCreate}>create</button>
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
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
