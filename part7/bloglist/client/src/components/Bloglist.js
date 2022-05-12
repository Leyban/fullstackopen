import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs)
  const style = {
    padding: 10,
    border: '2px solid black',
    borderRadius: '5px',
    display: 'block',
    margin: 2,
    textDecoration: 'none',
    color: '#333',
  }

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Link style={style} key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      ))}
    </div>
  )
}

export default Bloglist
