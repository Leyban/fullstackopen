const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

if (process.env.NODE_ENV === 'development') {
    userRouter.get('/', async (request, response) => {
        const users = await User.find({})
        response.json(users)
    })
}


userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // validation
    if (!username || !password){
        return response.status(400).json({
            error: 'username and password required'
        })
    } else if ( username.length<3 || password.length<3){
        return response.status(400).json({
            error: 'username and password must be at least 3 characters long'
        })
    }


    // check uniquness
    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: 'username must be unique'
        }) 
    }

    // password encryption
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // new user model instance
    const user = new User({
        name,
        username,
        passwordHash
    })

    // saving to database
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = userRouter