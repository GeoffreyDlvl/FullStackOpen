const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: '61cb36115ff9842fe83b1a2a'
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '61cb36e033af232221a79b97'
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
    user: '61cb36115ff9842fe83b1a2a'
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
    user: '61cb36115ff9842fe83b1a2a'
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
    user: '61cb36e033af232221a79b97'
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
    user: '61cb36e033af232221a79b97'
  }
]

const users = [
  {
    username: 'root',
    password: 'sekret',
    _id: '61cb36115ff9842fe83b1a2a'
  },
  {
    username: 'test_user',
    password: 'pa$$w0rd',
    _id: '61cb36e033af232221a79b97'
  },

]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'temp',
      author: 'temp',
      url: 'temp'
    })

  await blog.save()
  await blog.remove()

  return blog._id
}

const cleanDatabases = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
}

const populateDatabases = async () => {
  await Blog.insertMany(blogs)

  const usersPwdHashed = await Promise.all(users.map(async (u) => {
    const hashPwd = await bcrypt.hash(u.password, 10)
    return {
      username: u.username,
      _id: u._id,
      passwordHash: hashPwd
    }
  }))

  await User.insertMany(usersPwdHashed)
}

const getAuthenticationToken = async (api, username = 'root', password = 'sekret') => {
  const correctUser = {
    username,
    password
  }
  const response = await api
    .post('/api/login')
    .send(correctUser)

  return response.body.token
}

module.exports = {
  blogs,
  blogsInDb,
  usersInDb,
  nonExistingId,
  cleanDatabases,
  populateDatabases,
  getAuthenticationToken
}