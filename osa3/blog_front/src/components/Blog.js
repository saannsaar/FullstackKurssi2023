

const Blog = ({blogs}) => {

  return ( 

   <div key={blogs.id}>{blogs.title} {blogs.author} {blogs.url}</div>
  )
}

export default Blog