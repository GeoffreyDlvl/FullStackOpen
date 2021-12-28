const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const findUserFrom = async (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  return await User.findById(decodedToken.id)
}

blogsRouter.get('/', async (request, response) => {
  const blogs =
    await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const user = await findUserFrom(request.token)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(blog)
    await user.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await findUserFrom(request.token)
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'token does not match with blog post creator' })
    }
    await blog.remove()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    ...body
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter