import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  return (
    <div className="userlist">
      <h1>Users</h1>
      <div className="conainer">
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogcount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
