const listHelper = require('../utils/list_helper')
const helper = require('../test/test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const blogs = helper.initialblogs
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
    test('when a list of a lot of blogs, equals sum of all blogs likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
    test('return the highest liked blog', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })
    test('return the author with highest number of blog posts', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
          })
    })
    test('return the author with highest number of total likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
          })
    })
})

