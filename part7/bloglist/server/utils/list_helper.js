const _ = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
}
  
const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach(blog => sum += blog.likes)
    return sum
}

const favoriteBlog = (blogs) => {
    let fave = blogs[0]
    blogs.map(blog => {
        if (blog.likes > fave.likes){
            fave = blog;
        }
        return blog
    })
    return { 
        title:fave.title, 
        author: fave.author, 
        likes:fave.likes 
    }
}

const mostBlogs = (blogs) => {
    const blogsCopy = [...blogs]
    const authors = _.union(blogsCopy.map(blog => blog.author))

    const authorCount = authors.map(author => {
        return {
            author :author,
            blogs: blogsCopy.filter(blog => blog.author === author).length
        }
    })
    return _.maxBy(authorCount, 'blogs')
}

const mostLikes = (blogs) => {
    const blogsCopy = [...blogs]
    const authors = _.union(blogsCopy.map(blog => blog.author))

    const authorCount = authors.map(author => {
        let totalLikes = 0;
        blogsCopy
            .filter(blog => blog.author === author)
            .forEach(blog => totalLikes+=blog.likes)
            
        return {
            author : author,
            likes: totalLikes
        }
    })
    return _.maxBy(authorCount, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}