import { useState } from 'react'
import { TextField, Button } from '@mui/material'



const CreateBlogForm = ( { createNewBlog } ) => {

  console.log(createNewBlog)
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
    console.log(newblogObject)
    createNewBlog(newblogObject)

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
    <><h2>Create a new blog</h2><form onSubmit={handleCreation}>
      <div>
        <TextField type="text" label="Title" name="title" value={newblog.title} onChange={handleBlogChange} />
      </div>
      <div>
        <TextField label="Author" type="text" name="author" value={newblog.author} onChange={handleBlogChange} />
      </div>
      <div>
        <TextField label="Url" type="text" name="url" value={newblog.url} onChange={handleBlogChange} />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Save blog
        </Button>
      </div>
    </form></>
  )
}

export default CreateBlogForm