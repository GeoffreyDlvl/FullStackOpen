const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [testHelper.blogs[0]]
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.blogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {

  test('of empty list is empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog, is this blog', () => {
    const oneBlog = testHelper.blogs[0]
    const listWithOneBlog = [oneBlog]
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(oneBlog)
  })

  test('of a bigger list is blog with more likes', () => {
    const expectedFavoriteBlog = testHelper.blogs[2]
    expect(listHelper.favoriteBlog(testHelper.blogs)).toEqual(expectedFavoriteBlog)
  })

})

describe('most blogs', () => {

  test('of empty list is empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test('when list has only one blog, is its author with count one', () => {
    const expected = {
      author: 'Michael Chan',
      blogs: 1,
    }

    const listWithOneBlog = [testHelper.blogs[0]]
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expected)
  })

  test('of a bigger list is author with most blogs and blog count', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(listHelper.mostBlogs(testHelper.blogs)).toEqual(expected)
  })

})

describe('most likes', () => {

  test('of empty list is empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })

  test('when list has only one blog, is its author with its likes value', () => {
    const expected = {
      author: 'Michael Chan',
      likes: 7,
    }

    const listWithOneBlog = [testHelper.blogs[0]]
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expected)
  })

  test('of a bigger list is author with most blogs and likes count', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(listHelper.mostLikes(testHelper.blogs)).toEqual(expected)
  })

})