const Blog = ({blog}) => (
  <div class="blogi">
    <h3>{blog.title}</h3>
    <p><strong>Author: </strong> {blog.author} </p>
    <p><strong>URL: </strong> {blog.url} </p>
    <p> <strong>This blog has: </strong> {blog.likes} likes! </p>
  </div>  
 
)

export default Blog