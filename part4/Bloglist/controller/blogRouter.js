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

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
        title: body.title,
        url: body.url,
        author: body.author,
        likes:body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new:true})
    response.json(returnedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter