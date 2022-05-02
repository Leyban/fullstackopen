import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

let container, handleLike, handleDelete

describe('<Blog />', () => {
  beforeEach(() => {
    handleLike = jest.fn()
    handleDelete = jest.fn()

    const testBlog = {
      id:'blogid',
      title: 'This is a test title',
      author: 'Doug',
      url: 'www.testing.com',
      likes: 2222,
      user: 'notarealuser'
    }

    container = render(<Blog blog={testBlog} handleLike={handleLike} handleDelete={handleDelete} />).container
  })

  test('renders title and author but not url', () => {
    const title = screen.queryByText('This is a test title')
    const author = screen.queryByText('Doug')
    const url = screen.queryByText('www.testing.com')
    const likes = screen.queryByText('2222')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders url and likes when button is clicked', () => {
    const url = screen.queryByText('www.testing.com')
    const likes = screen.queryByText('2222')
    const showButton = screen.queryByText('show')

    userEvent.click(showButton)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('like button pressed twice will call handler twice', async () => {
    const showButton = screen.queryByText('show')
    await userEvent.click(showButton)

    const likeButton = container.querySelector('.likeButton')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(likeButton).toBeDefined()
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
