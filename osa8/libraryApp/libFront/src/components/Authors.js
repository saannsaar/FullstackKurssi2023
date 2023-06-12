import { useState } from "react"
import { UPDATE_YEAR, ALL_AUTHORS, ALL_BOOKS } from "../queries"
import { useMutation } from '@apollo/client/react/hooks/useMutation'
import Select from 'react-select'

const Authors = (props) => {


  const options = props.authors.slice().map(a => {
    return { value: a.name, label: a.name }
  })
console.log(props.logged)
  if (props.logged) {
    console.log("On token")
  }


  
  const [ setBornTo, setNewYear ] = useState('')
  const [ selectedOpiton, setSelectedOption ] = useState(null)

 
  const [ updateYear ] = useMutation(UPDATE_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  

 console.log(props.authors)
 if (!props.authors) {
  return null
 }

 const submitYear = async (event) => {
  event.preventDefault()


  console.log(selectedOpiton, setBornTo)
  updateYear({ variables: { name: selectedOpiton.value,  setBornTo } })

  setSelectedOption(null)
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


  {props.token && 
  <div>
     <h3>
    Set birthyear
  </h3>
  <form onSubmit={submitYear}>
        <div>
          Name: 
          <Select defaultValue={selectedOpiton} onChange={setSelectedOption} options={options}/>
        </div>
        <div>
          Born: 
          <input type="number"  value={setBornTo}
            onChange={({ target }) => setNewYear(parseInt(target.value))}/>
        </div>
        <button type="submit"> update author </button>
</form>
</div>}
 
    
    </div>
  )
}

export default Authors
