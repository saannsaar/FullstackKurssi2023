import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client/react/hooks/useMutation'
import { updateCache } from '../App'
import { useNavigate } from 'react-router-dom'

const NewBook = (props) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const [ createNewBook ] = useMutation(ADD_BOOK, { 
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    
  })


  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    
    let publishedInt = parseInt(published)
    console.log( title, publishedInt, author, genres )

    if (genres.length === 0) {
      createNewBook({ variables: { title, published: publishedInt, author } })
  
    } else {
      createNewBook({ variables: { title, published: publishedInt, author, genres } })

    }
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    navigate('/books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
   console.log(genres)
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook