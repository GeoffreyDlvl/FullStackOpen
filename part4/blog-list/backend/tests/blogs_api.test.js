const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const initialBlogs = helper.blogs

beforeEach(async () => {
  await helper.cleanDatabases()
  await helper.populateDatabases()
})

describe('when there is initially some blogs saved', () => {
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
})

describe('addition of a new blog post', () => {
  test('succeeds with valid data', async () => {
    const newBlogPost = {
      title: 'A new blog post',
      author: 'Some author',
      url: 'http://some-url.com',
      likes: 2
    }
    const authToken = await helper.getAuthenticationToken(api)

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const blogContent = blogsAtEnd.map(blog => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }))

    expect(blogContent).toContainEqual(newBlogPost)
  })

  test('succeeds when "likes" property is undefined, and defaults to zero', async () => {
    const newBlogPost = {
      title: 'A new blog post',
      author: 'Some author',
      url: 'http://some-url.com',
    }
    const authToken = await helper.getAuthenticationToken(api)

    const response =
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + authToken)
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  test('fails with statuscode 400 if title and url properties are missing', async () => {
    const newBlogPost = {
      author: 'Some author',
      likes: 2
    }
    const authToken = await helper.getAuthenticationToken(api)

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlogPost)
      .expect(400)
  })

  test('fails with statuscode 401 when authentication token is incorrect', async () => {
    const newBlogPost = {
      title: 'A new blog post',
      author: 'Some author',
      url: 'http://some-url.com',
      likes: 2
    }
    const authToken = 'invalid_token'

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBlogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('delete a blog post', () => {
  test('succeeds with statuscode 204 when id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete)
  })
})

describe('updating an individual blog post', () => {
  test('succeeds if id exists', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
  })

  test('fails with statuscode 404 if id does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is malformed', async () => {
    const malformedId = '123abcThisIsMalformed'

    await api
      .put(`/api/blogs/${malformedId}`)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})