import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'




const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
   
    voteOf(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const updatedVote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(an => an.id !== id ? an : updatedVote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }


  }
})

export const { voteOf, appendAnecdote, setAnecdotes } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteReducer.reducer