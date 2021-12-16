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

test('returned blogs have an "id" property', async () => {
  const response =
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  expect(response.body[0].id).toBeDefined()
})

test('create a new blog post', async () => {
  const newBlogPost = {
    title: 'A new blog post',
    author: 'Some author',
    url: 'http://some-url.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.allBlogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const blogContent = blogsAtEnd.map(blog => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }))

  expect(blogContent).toContainEqual(newBlogPost)
})

test('undefined "likes" property defaults to zero', async () => {
  const newBlogPost = {
    title: 'A new blog post',
    author: 'Some author',
    url: 'http://some-url.com',
  }

  const response =
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toEqual(0)
})

test('cannot create a new blog if title and url properties are missing', async () => {
  const newBlogPost = {
    author: 'Some author',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})