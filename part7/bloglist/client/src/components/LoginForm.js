import { useDispatch } from 'react-redux'
import { useInput } from '../hooks'
import { clearErrorMessage, errorAlert } from '../reducers/errorReducer'
import { loginUser } from '../reducers/userReducer'
import Error from './Error'

const LoginForm = () => {
  const { clear: clearUsername, ...username } = useInput('text')
  const { clear: clearPassword, ...password } = useInput('password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      dispatch(clearErrorMessage())
      clearUsername()
      clearPassword()
    } catch (error) {
      dispatch(errorAlert('Invalid username or password'))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <h1>Log in to the application</h1>
      <Error />
      <div>
        username:
        <input className="usernameInput" {...username} />
      </div>
      <div>
        password:
        <input className="passwordInput" {...password} />
      </div>
      <button type="submit" onClick={handleLogin}>
        Enter
      </button>
    </form>
  )
}

export default LoginForm
