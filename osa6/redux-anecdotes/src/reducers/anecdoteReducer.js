import { createSlice } from '@reduxjs/toolkit'





const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
    
      state.push(action.payload)
    },
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

export const {createAnecdote, voteOf, appendAnecdote, setAnecdotes } = anecdoteReducer.actions

export default anecdoteReducer.reducer