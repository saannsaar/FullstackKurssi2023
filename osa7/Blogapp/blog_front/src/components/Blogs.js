import { TableBody, TableHead, Table, TableContainer, TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.slice().sort((a,b) => a.likes - b.likes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>

              </TableRow>

            )}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )

}

export default Blogs