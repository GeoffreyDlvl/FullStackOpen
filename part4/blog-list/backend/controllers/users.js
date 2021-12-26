const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users =
    await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short (must be at least 3 characters)' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: []
  })
  try {
    const result = await newUser.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter