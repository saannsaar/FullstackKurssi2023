
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/NotiReducer'


const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const dispatch = useDispatch()
  console.log(blog)

  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const handleLike = () => {
    blog.likes = blog.likes +1
    updateBlog(blog)
    dispatch(setNotification({ noti: 'Blog liked!!', notiType: 'create' }))
  }
  const handleDelete = () => {
    deleteBlog(blog)
  }




  if (!showMoreInfo) {
    return (
      <div className="blogi">
        <h3>{blog.title}, by {blog.author} <button onClick={() => setShowMoreInfo(true)}>Show</button></h3>

      </div>
    )
  }
  return (
    <div className="blogi">
      <h3>{blog.title}, by {blog.author} <button onClick={() => setShowMoreInfo(false)}>Hide</button></h3>
      <p><strong>Author: </strong> {blog.author} </p>
      <p><strong>URL: </strong> {blog.url} </p>
      <p> <strong>This blog has: </strong> {blog.likes} <strong> likes!</strong>
        <button className="like" onClick={handleLike}>Like</button></p>
      <p>{blog.user.username}</p>
      <button onClick={handleDelete}>Remove</button>
    </div>

  )


}

export default Blog