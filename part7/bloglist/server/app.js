const express = require('express');
const app = express();
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogRouter = require('./controller/blogRouter');
const userRouter = require('./controller/userRouter');
const loginRouter = require('./controller/loginRouter');
const testRouter = require('./controller/testRouter')

logger.info("connecting to ", config.MONGODB_URI) 

mongoose.connect(config.MONGODB_URI)
    .then((result) => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('unable to connect to MongoDB', error.message)
    })

// middleware
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


// testing 
if (process.env.NODE_ENV === 'test'){
    app.use('/api/test', testRouter)
}


// routes
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


// catchers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app