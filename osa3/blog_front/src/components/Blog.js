
import { useState } from "react"


const Blog = ({blog, updateBlog}) => {
 
  
  
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const handleLike = () => {
    blog.likes = blog.likes +1
    updateBlog(blog)
  }

    


  if (!showMoreInfo) {
    return (
      <div class="blogi">
      <h3>{blog.title}, by {blog.author}</h3>
      <button onClick={() => setShowMoreInfo(true)}>Show</button>
      </div>
    )
  }
  return (  
  <div class="blogi">
 <h3>{blog.title}, by {blog.author}</h3>
  <p><strong>Author: </strong> {blog.author} </p>
  <p><strong>URL: </strong> {blog.url} </p>
  <p> <strong>This blog has: </strong> {blog.likes} <strong> likes!</strong> 
  <button onClick={handleLike}>Like</button></p>
  <p>{blog.user.username}</p>
<button onClick={() => setShowMoreInfo(false)}>Hide</button>
</div> 

  )
 
 
  }

export default Blog