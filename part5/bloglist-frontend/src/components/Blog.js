import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
    const [viewDetails, setViewDetails] = useState(false)

    const buttonLabel = viewDetails ? 'hide' : 'show'

    const toggleDetails = () => {
        setViewDetails(!viewDetails)
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
                        <button
                            onClick={() => handleLike(blog.id)}
                            className="likeButton"
                        >
                            like
                        </button>
                    </p>
                    <p>{blog.user.name}</p>
                    <button
                        onClick={() =>
                            handleDelete(blog.id, blog.title, blog.author)
                        }
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default Blog
