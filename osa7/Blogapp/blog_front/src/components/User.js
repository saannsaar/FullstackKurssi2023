import {  useParams } from 'react-router-dom'

const User = ({ users }) => {

  const id = useParams().id
  const user = users.find(user => user.id === id)
  console.log(user.blogs)
  if (user.blogs.length === 0) {
    return (
      <><h1>{user.username}</h1>
        <h3>This user does not have any blogs yet</h3>
      </>
    )
  }
  return (
    <><h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </>
  )


}

export default User