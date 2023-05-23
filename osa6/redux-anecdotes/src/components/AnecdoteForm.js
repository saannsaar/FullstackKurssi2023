import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
       
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You succesfully created a new anecdote: ${content}`, 4))
        
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>Add</button>
        </form>
    )
}

export default AnecdoteForm