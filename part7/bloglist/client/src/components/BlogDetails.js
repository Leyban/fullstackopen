import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <div className="blogDetails">
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))} className="likeButton">
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogDetails
