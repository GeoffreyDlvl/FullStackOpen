
var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, { likes }) => total + likes, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => blog.likes > favorite.likes ? blog : favorite

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const countBy = _.countBy(blogs, 'author')
  const mostBlogsAuthor = Object.keys(countBy).reduce((a, b) => countBy[a] > countBy[b] ? a : b)
  const mostBlogsCount = countBy[mostBlogsAuthor]
  return {
    author: mostBlogsAuthor,
    blogs: mostBlogsCount,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authorsGroupedByLikesSum =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        author: key,
        likes: _.sumBy(objs, 'likes')
      }))
      .value()
  const withMoreLikes = authorsGroupedByLikesSum.reduce((max, curr) => curr.likes > max.likes ? curr : max)
  return withMoreLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}