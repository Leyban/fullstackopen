const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const newBlog = new Blog(request.body)
    if (!newBlog.title || !newBlog.url){
        return response.status(400).end()
    }

    await newBlog.save()
    response.status(201).json(returnedBlog)
})

module.exports = blogRouter