import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
const App = () => {
 const result = useQuery(ALL_AUTHORS)
 const books = useQuery(ALL_BOOKS)

 if (result.loading || books.loading) {
  return <div>Loading...</div>
 }

 console.log(result.data.allAuthors)
 console.log(books.data.allBooks)
  return (
    <div>
      <Router>
        <div>
          <Link to="/">Authors</Link>
          <Link to="/books">Books</Link>
          <Link to="/add">Add new</Link>
        </div>

        <Routes>
          <Route path="/" element={<Authors authors={result.data.allAuthors}/>}/>
          <Route path="/books" element={<Books books={books.data.allBooks} />}/>
          <Route path="/add" element={<NewBook />}/>
        </Routes>
      </Router>

      
    </div>
  )
}

export default App
