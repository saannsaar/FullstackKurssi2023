import {  useMutation, useQueryClient } from "react-query"
import {  createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  // Ensin luetaan "queryClient"-olion avulla "anecdotes"-kyselyn tila ja päivitetään
// lisäämällä mukaan uusi anekdootti joka saadaan takaisinkutsufuntion parametrina
// koska muuten sovellus tekee POST pyynnön jälkeen uuden GET pyynnön vähän turhaan
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
