import { gql, useApolloClient, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = () => {

  const [ genres, setGenres ] = useState([])
  // All books from first query
  const [ books, setBooks ] = useState([])
  // Use this to filter the books returned from the first query 
  const [filteredBooks, setFilteredBooks] = useState([])
  // Filters state
  const [ genreFilter, setGenreFilter ] = useState(null)
  const client = useApolloClient()

  const varr = {
    variables: { genres: genreFilter, },
  }
  const { data, refetch, loading, error } = useQuery(ALL_BOOKS, varr)
  console.log(data)

  
  useEffect(() => {
    console.log("use effectissä")
    // Refetch incase new book was added
    refetch()
    if (data) {
      
      setBooks(data.allBooks)
      setFilteredBooks(data.allBooks)
     
      // flat() makes a new array with all sub-array elements concatenated into it recursively 
      let genreset = new Set(data.allBooks.map((b) => b.genres).flat())
      genreset = Array.from(genreset)
      if (genres.length === 0) {

        genreset.push('no filter')
        setGenres(genreset)
      }
     
    
    }
   
   
   }, [data, books, genres.length, refetch])


   
   if (loading || error) {
    return <div>Loading...</div>
   }
 
   

  const changeFilter = async (g) => {

    if (g === 'no filter') {
      setGenreFilter(null)
      setFilteredBooks(books)
    } else {
    console.log("FILTTERISSÄ")
    setGenreFilter(g)
    const filterBooks = await client.readQuery({
      query: ALL_BOOKS,
      variables: { genreFilter }
    })
    setFilteredBooks(filterBooks.allBooks)
    console.log(filteredBooks)
    }
    
  
 }

  return (
    <div>
      <h2>books</h2>


      <table>
        <tbody>
          <tr> 
            <th>name</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    {genres.map((g) => (
      <button key={g} style={{ margin: '3px'} } onClick={() => changeFilter(g)}>{g}</button>
    ))}

    </div>
  )
}

export default Books
