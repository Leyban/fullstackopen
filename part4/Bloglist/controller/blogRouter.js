const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
    console.log('blogRouter get');
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    console.log('blogRouter post');
    const newBlog = new Blog(request.body)

    newBlog
      .save()
      .then(returnedBlog => {
        response.status(201).json(returnedBlog)
      })
      .catch(error => next(error))
})

module.exports = blogRouter