import { useDispatch, useSelector } from "react-redux"
import { voteOf } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) => {
    return (
        <li >
            {anecdote.content}
            <button onClick={handleClick}>VOTE!</button>
            <strong> {anecdote.votes}</strong>
        </li>
    )

}

const AnecdoteList = () => {
    const dispatch = useDispatch()
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
            {anecdotes.slice().sort((a,b)=>  a.votes-b.votes).map(anecdote => 
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteOf(anecdote.id))}/>)}
        </ul>
    )
}

export default AnecdoteList