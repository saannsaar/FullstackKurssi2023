import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.slice().sort((a,b) => a.likes - b.likes).map(blog =>
      // eslint-disable-next-line react/jsx-key
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      )}
    </div>
  )

}

export default Blogs