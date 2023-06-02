import { Link } from 'react-router-dom'

// Komponentti html tablen luomiseen johon näytetään tietokannassa olevat käyttäjät ja niiden luomat blogit
const Users = (users) => {
  console.log(users)
  console.log(users.users)
  return (
    <><h1>USERS</h1><table>
      <tr>
        <th>Username</th>
        <th>Blogs created</th>
      </tr>
      {users.users.map(user =>
      // eslint-disable-next-line react/jsx-key
        <tr>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
          <td>{user.blogs.length}</td>
        </tr>
      )}
    </table></>

  )
}

export default Users