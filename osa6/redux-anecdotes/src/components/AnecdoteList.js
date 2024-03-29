import { useDispatch, useSelector } from "react-redux"
import { voteOf } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    const handleVote = () => {
   
        dispatch(voteOf(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 4))
       
    
        
    }

    return (
        <li >
            {anecdote.content}
            <button onClick={handleVote}>VOTE!</button>
            <strong> {anecdote.votes}</strong>
        </li>
    )

}



const AnecdoteList = () => {
  
    console.log(useSelector(state => state.filter))
    
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            console.log(state.filter)
            console.log(state.anecdotes)
            return state.anecdotes
        } else { 
            console.log(state)
            return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    })

    return(
        <ul>
            {anecdotes.slice().sort((a,b)=>  b.votes-a.votes).map(anecdote => 
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                />)}
        </ul>
    )
}

export default AnecdoteList