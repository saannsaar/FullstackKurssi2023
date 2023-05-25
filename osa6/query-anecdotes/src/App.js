import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { getAnecdotes, voteAnecdote } from './requests'

const App = () => {
const queryClient = useQueryClient()

// Luetaan "queryClient"-olion avulla "anecdotes"-kyselyn tila ja päivitetään
// etsimällä äänestetty anekdootti id:n perusteella ja muutetaan vain sitä pyynnössä
// koska muuten sovellus tekee PUT pyynnön jälkeen uuden GET pyynnön vähän turhaan
  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedA) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === votedA.id ? votedA : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})

 
  }


 // Datan hakemien palvelimelta axios get-metodilla joka on kääritty useQuery-funktiolla muodostetuksi kyselyksi
 // kutsun ensimmäinen parametri on merkkijono "anecdotes" joka on avain määriteltyyn kyselyyn
 // paluuarvo on olio joka kertoo kyselyn tilan
  const result = useQuery(
    'anecdotes', getAnecdotes)
  console.log(result)

  if ( result.isLoading ) {
    return <div> loading data... </div>
  }

  const anecdotes = result.data

  console.log(anecdotes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
