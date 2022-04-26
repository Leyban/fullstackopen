const express = require('express');
const app = express();
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogRouter')

logger.info("connecting to ", config.MONGODB_URI) 

mongoose.connect(config.MONGODB_URI)
    .then((result) => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('unable to connect to MongoDB', error.message)
    })


app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/test', (request,response) => {
    console.log('this works');
    response.send("this works").end()
})

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app