import { useState } from "react"
import { UPDATE_YEAR, ALL_AUTHORS, ALL_BOOKS } from "../queries"
import { useMutation } from '@apollo/client/react/hooks/useMutation'

const Authors = (props) => {

  const [ name, setFindName ] = useState('')
  const [ setBornTo, setNewYear ] = useState('')
 
  const [ updateYear ] = useMutation(UPDATE_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

 console.log(props.authors)
 if (!props.authors) {
  return null
 }

 const submitYear = async (event) => {
  event.preventDefault()


  console.log(updateYear)
  updateYear({ variables: { name,  setBornTo } })

  setFindName('')
  setNewYear('')

}

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.slice().map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

<div>
  <h3>
    Set birthyear
  </h3>
  <form onSubmit={submitYear}>
        <div>
          Name: 
          <select value={name} onChange={ ({ target }) => setFindName(target.value) }>
            {props.authors.slice().map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          Born: 
          <input type="number"  value={setBornTo}
            onChange={({ target }) => setNewYear(parseInt(target.value))}/>
        </div>
        <button type="submit"> update author </button>
</form>
</div>
    
    </div>
  )
}

export default Authors
