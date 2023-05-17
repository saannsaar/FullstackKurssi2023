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
    
    const anecdotes = useSelector((state) => state)
    console.log(anecdotes)

    return(
        <ul>
            {anecdotes.sort((a,b)=>  a.votes-b.votes).map(anecdote => 
                <Anecdote key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteOf(anecdote.id))}/>)}
        </ul>
    )
}

export default AnecdoteList