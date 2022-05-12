import { useState } from 'react'
import { deleteThisBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const dispatch = useDispatch()

  const buttonLabel = viewDetails ? 'hide' : 'show'

  const toggleDetails = () => {
    setViewDetails(!viewDetails)
  }
  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteThisBlog(blog))
    }
  }

  return (
    <div className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDetails}>{buttonLabel}</button>
      {viewDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)} className="likeButton">
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => handleDelete(blog)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
