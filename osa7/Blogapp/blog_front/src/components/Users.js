import { Link } from 'react-router-dom'
import { TableContainer, TableCell, TableBody, TableRow, Table, TableHead } from '@mui/material'

// Komponentti taulukon luomiseen johon näytetään tietokannassa olevat käyttäjät ja niiden luomat blogit
const Users = (users) => {
  console.log(users)
  console.log(users.users)
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.users.map(user => <TableRow key={user.id}>
            <TableCell>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </TableCell>
            <TableCell>
              {user.blogs.length}
            </TableCell>

          </TableRow>

          )}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default Users