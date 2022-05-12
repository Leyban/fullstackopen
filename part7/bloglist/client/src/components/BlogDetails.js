import { useDispatch } from 'react-redux'
import { useInput } from '../hooks'
import { commentBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const { clear: clearComment, ...comment } = useInput('text')

  const handleComment = () => {
    dispatch(commentBlog(blog, comment.value))
    clearComment()
    console.log(blog)
  }

  const url = (link) => {
    if (/https:\/\//.test(link)) {
      return blog.url
    }

    return `https://${link}`
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blogDetails">
      <h1>{blog.title}</h1>
      <a
        target="_blank"
        href={url(blog.url)}
        rel="noopener noreferrer"
        replace="true"
      >
        {blog.url}
      </a>
      <p>
        likes {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))} className="likeButton">
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <h2>comments</h2>
      <input {...comment} />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
