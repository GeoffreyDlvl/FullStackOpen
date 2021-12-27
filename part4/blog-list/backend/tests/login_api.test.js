const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await helper.cleanDatabases()
  await helper.populateDatabases()
})

describe('when user log in', () => {
  test('token is returned when credentials are correct', async () => {
    const correctUser = {
      username: 'root',
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(correctUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('token')
  })

  test('error 401 is raised when credentials are incorrect', async () => {
    const incorrectUser = {
      username: 'root',
      password: 'wrong_password'
    }

    await api
      .post('/api/login')
      .send(incorrectUser)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})