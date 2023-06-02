

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/NotiReducer'
import { likeOf } from '../reducers/blogsReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { removeBlog } from '../reducers/blogsReducer'
import { useState } from 'react'
import Comment from './Comment'
import { commentBlog } from '../reducers/blogsReducer'

const Blog = ({ blogs }) => {
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  console.log(blog)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')




  const handleLike = () => {
    const testi = { ...blog, user: blog.user.id }
    dispatch(likeOf(testi))
    dispatch(setNotification({ noti: 'Blog liked!!', notiType: 'create' }))
  }

  const handleComment = (e) => {
    e.preventDefault()

    console.log(comment)

    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
      try {
        console.log(blog)
        dispatch(removeBlog(blog.id))
        navigate('/')
        dispatch(setNotification({ noti: 'Blog deleted!', notiType: 'create' }))
      } catch(error) {
        dispatch(setNotification({ noti: `You cant do that: ${error}`, notiType: 'error' }))
      }
    }
  }


  const handleChangeC = (e) => {
    setComment(e.target.value)
    console.log(comment)
  }

  return (
    <div className="blogi">
      <h3>{blog.title} </h3>
      <p><strong>Author: </strong> {blog.author} </p>
      <p><strong>URL: </strong> {blog.url} </p>
      <p> <strong>This blog has: </strong> {blog.likes} <strong> likes!</strong>
        <button className="like" onClick={handleLike}>Like</button></p>
      <p>Added by: {blog.user.username}</p>
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={handleChangeC}/>
        <button type="submit">comment</button>
      </form>
      <h4>Comments:</h4>
      <Comment comments={blog.comments} />

      <button onClick={handleDelete}>Remove</button>
    </div>

  )


}

export default Blog