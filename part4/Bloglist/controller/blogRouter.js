const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const {title, url, author, likes} = new Blog(request.body)
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!title || !url) {
        return response.status(400).end()
    }

    const newBlog = new Blog({
        title,
        url,
        author,
        likes,
        user: user._id
    })

    const returnedBlog = await newBlog.save()
    response.status(201).json(returnedBlog)
})

blogRouter.put('/:id', async (request, response) => {
    const token = request.token
    const blogIdToUpdate = request.params.id
    const blogToUpdate = await Blog.findById(blogIdToUpdate)

    // token verification
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // user id verification
    if (decodedToken.id !== String(blogToUpdate.user)){
        return response.status(401).json({ error: 'user not authorized to update blog' })
    }

    const body = request.body

    const updatedBlog = {
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(returnedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const blogIdToDelete = request.params.id
    const blogToDelete = await Blog.findById(blogIdToDelete)

    // token verification
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // user id verification
    if (decodedToken.id !== String(blogToDelete.user)){
        return response.status(401).json({ error: 'user not authorized to delete blog' })
    }

    await Blog.findByIdAndRemove(blogIdToDelete)
    response.status(204).end()
})

module.exports = blogRouter