import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'
import { getAnecdotes } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
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
