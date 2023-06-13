import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = () => {

  const [ genres, setGenres ] = useState({})
  const [ books, setBooks ] = useState([])
  const [ genreFilter, setGenreFilter ] = useState(null)

  const bookquery = useQuery(ALL_BOOKS)
  console.log(bookquery.data.allBooks)

  useEffect(() => {
    console.log("use effectissä")
    if (!bookquery.data.allBooks) {
      console.log("ei dataa")
      return null
    }
    console.log(bookquery)
    setBooks(bookquery.data.allBooks)
    console.log(books)
    // flat() makes a new array with all sub-array elements concatenated into it recursively 
    let genreset = new Set(bookquery.data.allBooks.map(b => b.genres).flat())
    genreset = Array.from(genreset)
    if (genres.length === 0) {
      let genrearr = []
      genrearr.push('no filter')
      setGenres(genrearr)
    }
    setGenres(genreset)
   
    console.log(genres)
   },[bookquery.data.allBooks, genres.length])


   


    console.log("MOI")
    console.log(genres)



  const changeFilter = async (e) => {
    setGenreFilter(e.target.value)
    e.preventDefault()
    console.log(genreFilter)
 }


  return (
    <div>
      <h2>books</h2>


      <table>
        <tbody>
          <tr> 
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.slice().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    {genres.map((g) => (
      <button>{g}</button>
    ))}

    </div>
  )
}

export default Books
