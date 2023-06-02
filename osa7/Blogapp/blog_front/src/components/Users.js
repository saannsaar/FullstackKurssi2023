

const Users = (users) => {
  console.log(users)
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Blogs created</th>
      </tr>
      {users.map(user =>
        // eslint-disable-next-line react/jsx-key
        <tr>
          <td>{user.username}</td>
          <td>{user.blogs.length}</td>
        </tr>
      )}
    </table>

  )
}

export default Users