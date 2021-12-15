const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

const initialBlogs = helper.blogs

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = initialBlogs
    .map(blog => new Blog(blog))
  const promiseBlogs = blogs.map(blog => blog.save())
  await Promise.all(promiseBlogs)
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})