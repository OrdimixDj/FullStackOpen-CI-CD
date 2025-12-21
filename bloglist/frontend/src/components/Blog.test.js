import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
    title: 'Testing React components with Jest',
    author: 'Test Writer',
    url: 'http://testurl.com',
    likes: 10,
    user: { name: 'P. Testeur', username: 'testusername' }
  }

test('renders title and author, but hides URL and likes by default', () => {
  const mockHandler = jest.fn()
  const mockUser = { username: 'testusername', name: 'P. Testeur' }
  const handleBlogUpdate = mockHandler
  const handleBlogRemove = mockHandler

  const { container } = render(
    <Blog blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} user={mockUser} />
  )

  const titleAndAuthor = screen.getByText('Testing React components with Jest Test Writer')
  expect(titleAndAuthor).toBeDefined()

  const hiddenDetails = container.querySelector('.blog-complete')
  expect(hiddenDetails).toHaveStyle('display: none')

  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(blog.likes)

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('clicking the button shows url and likes', async () => {
  const mockHandler = jest.fn()
  const mockUser = { username: 'testusername', name: 'P. Testeur' }
  const handleBlogUpdate = mockHandler
  const handleBlogRemove = mockHandler

  const { container } = render(
    <Blog blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} user={mockUser} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const detailsDiv = container.querySelector('.blog-complete')
  expect(detailsDiv).not.toHaveStyle('display: none')

  const urlElement = screen.getByText(blog.url, { exact: false })
  expect(urlElement).toBeDefined()

  const likesText = screen.getByText(blog.likes, { exact: false })
  expect(likesText).toBeDefined()
})

test('clicking the likes 2 times calls 2 times mockHandler', async () => {
  const mockHandler = jest.fn()
  const mockUser = { username: 'testusername', name: 'P. Testeur' }
  const handleBlogUpdate = mockHandler
  const handleBlogRemove = mockHandler

  const { container } = render(
    <Blog blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemove={handleBlogRemove} user={mockUser} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form calls the handler with correct details when a new blog is created', async () => {
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing React components with Jest',
    author: 'Test Writer',
    url: 'http://testurl.com'
  })

  expect(titleInput).toHaveValue('')
  expect(authorInput).toHaveValue('')
  expect(urlInput).toHaveValue('')
})