import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog'
import  userEvent  from '@testing-library/user-event'

test('Form updates parents state and calls onsubmit', async () => {
  const createNewBlog = jest.fn()


  const { container } = render(<CreateBlog createBlog={createNewBlog} />)
  const user = userEvent.setup()
  const titleinput = container.querySelector('input[name="title"]')
  const authorinput = container.querySelector('input[name="author"]')
  const urlinput = container.querySelector('input[name="url"]')
  const saveButton = screen.getByText('Save')

  await user.type(titleinput, 'testi nimi')
  await user.type(authorinput, 'testi authori')
  await user.type(urlinput, 'google.com')
  await user.click(saveButton)

  console.log(createNewBlog.mock.calls)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0]).toMatchObject({ title: 'testi nimi', author: 'testi authori', url: 'google.com' })

} )
