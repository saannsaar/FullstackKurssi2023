import { useEffect, useState } from "react"
import Select from 'react-select'

const Books = (props) => {

  const [ genres, setGenres ] = useState({})
  const [ books, setBooks ] = useState([])
  const [ genreFilter, setGenreFilter ] = useState(null)

  useEffect(() => {
    // flat() makes a new array with all sub-array elements concatenated into it recursively 
    let genreset = new Set(props.books.map(b => b.genres).flat())
    genreset = Array.from(genreset)
    setGenres(genreset)
    setBooks(props.books)
    console.log(genres)
   },[genres, props.books])

  if (!props.books) {
    return null
  }


    console.log("MOI")
    console.log(genres)

  const options = genres.map(g => {
    return { value: g, label: g } 
  })
  console.log(options) 
  


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

      <Select defaultValue={genreFilter} options={options} onChange={changeFilter} />

    </div>
  )
}

export default Books
