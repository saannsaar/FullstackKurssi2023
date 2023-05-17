import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'



test('renders content of a blog before "show" button is clicked', () => {
  const blog = {
    title: 'Testi nimi',
    author: 'testi kirjoittjaa',
    url: 'testi.fi',
    likes: 0,
    user: {
      username: 'testiurser',
      name: 'Testi User',
      id: '1w1w1w1w1w1w1w1w1w1w1w1w1w'
    }
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Testi nimi, by testi kirjoittjaa')
  expect(element).toBeDefined()
  expect(element).not.toHaveTextContent('Url: testi.fi')
})

test('click the "show" button shows more info of the blog', async () => {
  const blog = {
    title: 'Testi nimi',
    author: 'testi kirjoittjaa',
    url: 'testi.fi',
    likes: 0,
    user: {
      username: 'testiurser',
      name: 'Testi User',
      id: '1w1w1w1w1w1w1w1w1w1w1w1w1w'
    }
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const showbutton = screen.getByText('Show')
  await user.click(showbutton)
  const element = screen.getByText('testi.fi')
  expect(element).toBeDefined()


})

test('Like button works, clicking twice calls eventhandler twice', async () => {
  const blog = {
    title: 'Testi nimi',
    author: 'testi kirjoittjaa',
    url: 'testi.fi',
    likes: 0,
    user: {
      username: 'testiurser',
      name: 'Testi User',
      id: '1w1w1w1w1w1w1w1w1w1w1w1w1w'
    } }
  const mockHandler = jest.fn()
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(blog.user))


  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>)

  const user = userEvent.setup()
  const showbutton = screen.getByText('Show')
  await user.click(showbutton)
  const likebutton = screen.getByText('Like')
  likebutton.onclick = mockHandler
  await user.click(likebutton)
  await user.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)


}
)