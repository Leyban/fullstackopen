import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('can submit a new blog', async () => {
    const submitNewBlog = jest.fn()

    const container = render(<BlogForm submitNewBlog={submitNewBlog} />).container

    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const submitButton = container.querySelector('button')

    await userEvent.type(titleInput, 'hey jude')
    await userEvent.type(authorInput, 'Beatles')
    await userEvent.type(urlInput, 'www.beatlefalsemusic.com')

    await userEvent.click(submitButton)

    expect(submitNewBlog.mock.calls[0][0].title).toBe('hey jude')
    expect(submitNewBlog.mock.calls[0][0].author).toBe('Beatles')
    expect(submitNewBlog.mock.calls[0][0].url).toBe('www.beatlefalsemusic.com')
  })
})