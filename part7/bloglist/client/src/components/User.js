const User = ({ userDetailed }) => {
  if (!userDetailed) {
    return null
  }

  return (
    <div className="user">
      <h1>{userDetailed.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {userDetailed.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
