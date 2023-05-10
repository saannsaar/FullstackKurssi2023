import { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import styles from './App.css'
import MessageInfo from './components/MessageInfo'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Add new')
  const [newNumber, setNewNumber] = useState('Add number')
  const [newFilter, setNewFilter] = useState("")
  const [message, setMessage] = useState(null)

 useEffect(() => {
  personService
  .getAllPersons()
  .then(initialPersons => {
    setPersons(initialPersons)
  })
 }, [])

 console.log("render", persons.length, "persons")
 
  const addPerson = (event) => {
    event.preventDefault()

    let personObj = {
     name: newName ,
     number: newNumber
 }      
 
  const foundPerson = persons.find(p => p.name === newName)

  if (foundPerson) {
    const id = foundPerson.id
    console.log(foundPerson)
    const confirmation = window.confirm(`${newName} is already added. Do you want to replace the old number with a new one?`)
    if (confirmation) {
      personService.update(id, {...foundPerson, number: newNumber})
      .then(savePerson => {
        setPersons(persons.map(person => person.id !== id ? person : savePerson))
        setNewName("Add new")
        setNewNumber("Add number")
        setMessage( `${savePerson.name}'s new number added.`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)

      }).catch(error => {
        setPersons(persons.filter(p => p.id !== id))
       setMessage(`Information of ${foundPerson.name} has already been removed from server.`)
       console.log(`${error.response.data.error}`)
       setTimeout(() => {
        setMessage(null)
       }, 2000)
      })
    }
  } else {
    personService.create(personObj)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setMessage( `${returnedPersons.name} added.`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      setNewNumber("Add number")
      setNewName("Add new")
      setNewFilter("")
    })
  }   
}

   
  // Poistaa json tiedostosta henkilön
  const handleDelete = (person) => {
    if ( window.confirm(`Do you want to delete ${person.name} from phonebook?`) == true) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((elem) => 
        elem.id !== person.id))
      })
    } else {
      return false
    }
   
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  

  return (
    <div>
      <h1>Phonebook</h1>
      <MessageInfo message={message} />
      <Filter handleFilter={handleFilterChange} />
      <h2>Add a new number</h2>
     <PersonForm handleSubmit={addPerson} handleNameChange={handleNameChange} 
     handleNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <div>
        <Person filtter={newFilter} persons={persons} handleDelete={handleDelete} />
      </div>
    </div>
  )

}

export default App