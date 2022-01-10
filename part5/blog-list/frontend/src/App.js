import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const Title = ({ title }) => (
  <h2>{title}</h2>
)

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('blogAppLoggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setNotification({
        type: 'error',
        message: 'Invalid credentials'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppLoggedUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
    }
    blogService
      .create(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setNotification({
          type: 'success',
          message: `a new blog ${blog.title} by ${blog.author} has been added`
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification({
          type: 'error',
          message: 'There was an error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <Title title='Log in to application' />
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}></input>
          </div>
          <div>password
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}></input>
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Title title='blogs' />
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:
          <input
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}>
          </input>
        </div>
        <div>author:
          <input
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}>
          </input>
        </div>
        <div>url:
          <input
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}>
          </input>
        </div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}

export default App