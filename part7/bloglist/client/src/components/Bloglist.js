import { useSelector } from 'react-redux'
import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="bloglist">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Bloglist
