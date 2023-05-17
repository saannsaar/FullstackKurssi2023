import { useState } from 'react'


const CreateBlog = ({ createBlog }) => {
  const [newblog, setNewblog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
    user: null
  })

  const handleCreation = (event) => {
    event.preventDefault()

    const newblogObject = {
      title:
             newblog.title,
      author: newblog.author,
      url: newblog.url,
    }
    createBlog(newblogObject)

    setNewblog({
      title: '',
      author: '',
      url: '',
      likes: 0,
      user: null
    })
  }



  const handleBlogChange = (event) => {
    setNewblog({
      ...newblog, [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={handleCreation}>
      <div>
        <h2>Create a new blog</h2>
        <p>Title: <input id='title-input' type="text" value={newblog.title} name="title" onChange={handleBlogChange}/></p>
        <p>Author: <input id='author-input' type="text" value={newblog.author} name="author" onChange={handleBlogChange}/></p>
        <p>Url: <input id='url-input' type="text" value={newblog.url} name="url" onChange={handleBlogChange}/></p>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default CreateBlog