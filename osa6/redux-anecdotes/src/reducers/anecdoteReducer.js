import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'




const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
   vote(state, action) {
    return state.map(a => a.id === action.payload.id ? action.payload : a)
   },
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }


  }
})

export const { vote,  appendAnecdote, setAnecdotes } = anecdoteReducer.actions

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

export const voteOf = anecdote => {
  
   return async dispatch => {
   const voted = await anecdoteService.update({...anecdote, votes: anecdote.votes +1})
   dispatch(vote(voted))
   }
}

export default anecdoteReducer.reducer