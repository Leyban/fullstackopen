import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <div className="navbar">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <em>{user.name} logged in</em>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navbar
