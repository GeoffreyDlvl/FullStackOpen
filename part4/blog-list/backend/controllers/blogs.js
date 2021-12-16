const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    ...body,
    likes: body.likes || 0
  })

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    response.status(400).end()
  }
})

module.exports = blogsRouter