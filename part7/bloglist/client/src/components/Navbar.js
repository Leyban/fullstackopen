import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const navstyle = {
  top: 0,
  left: 0,
  margin: 0,
  padding: 10,
  backgroundColor: 'navy',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: 'white',
}

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
}

const logoutStyles = {
  backgroundColor: '#82D2F7',
  padding: 10,
  borderRadius: 20,
}

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  return (
    <div className="navbar" style={navstyle}>
      <Link to="/" style={linkStyle}>
        Blogs
      </Link>
      <Link to="/users" style={linkStyle}>
        Users
      </Link>
      <em>{user.name} logged in</em>
      <button onClick={() => dispatch(logout())} style={logoutStyles}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
