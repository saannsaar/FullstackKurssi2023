import { useState } from 'react'
import { Alert, AppBar, Toolbar, Button } from '@mui/material'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendation from './components/Recommendation'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { BOOK_ADDED } from './queries.js'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }

  return (
   <Alert severity="error">
    {errorMessage}
   </Alert>
  )
}

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      
      let k = item.title
      console.log(k)
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    console.log(query)
    return {
     
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
 const result = useQuery(ALL_AUTHORS)
 const books = useQuery(ALL_BOOKS)
 const client = useApolloClient()

 useSubscription(BOOK_ADDED, {
  onData: ({ data }) => {
    console.log(data)
    const addedBook = data.data.bookAdded
    window.alert(`New book ${addedBook.title} by ${addedBook.author.name} added! :)`)
    updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
  }
 })

 const logout = () => {
  setToken(null)
  localStorage.clear()
  client.resetStore()
 }
 const notify = (message) => {
  setErrorMessage(message)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
 }
 if (result.loading || books.loading) {
  return <div>Loading...</div>
 }
 if (!token) {
  
  return (
    <div>
      <Router>

<AppBar position='static'>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Login</Button>
          <Button color="inherit" component={Link} to="/authors">Authors</Button>
          <Button color="inherit" component={Link} to="/books">Books</Button>
        </Toolbar>
      </AppBar>
      <Notify errorMessage={errorMessage}/>
     
    

  <Routes>
    <Route path="/" element={ <LoginForm setToken={setToken} setError={notify}/>}/>
    <Route path="/authors" element={<Authors token={token} authors={result.data.allAuthors}/>}/>
    <Route path="/books" element={<Books  />}/>
  </Routes>
</Router>

      
      
    </div>
  )
 }



 console.log(result.data.allAuthors)
 console.log(books)
  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <Router>

      <AppBar position='static'>
              <Toolbar>
                <Button color="inherit" component={Link} to="/">Authors</Button>
                <Button color="inherit" component={Link} to="/books">Books</Button>
                <Button color="inherit" component={Link} to="/add">Add new book</Button>
                <Button color="inherit" component={Link} to="/recommendation">Recommendations</Button>
                <Button color='inherit' component="button" onClick={logout}>logout</Button>
              </Toolbar>
            </AppBar>
       

        <Routes>
          <Route path="/" element={<Authors token={token} authors={result.data.allAuthors}/>}/>
          <Route path="/books" element={<Books books={books.data.allBooks} />}/>
          <Route path="/add" element={<NewBook setError={setErrorMessage}/>}/>
          <Route path="/recommendation" element={<Recommendation books={books.data.allBooks} />}/>
          
        </Routes>
      </Router>

      
    </div>
  )
}

export default App
