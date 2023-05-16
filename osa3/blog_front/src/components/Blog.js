
import { useState } from "react"

const Blog = ({blog}) => {

  const [showMoreInfo, setShowMoreInfo] = useState(false)

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
  <button>Like</button></p>
<button onClick={() => setShowMoreInfo(false)}>Hide</button>
</div> 

  )
 
 
  }

export default Blog