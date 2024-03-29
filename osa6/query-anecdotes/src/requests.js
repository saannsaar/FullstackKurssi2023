import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => 
   { const response = await axios.get(baseUrl)
   return response.data}

export const createAnecdote = async (content) =>
{
    const newAnecdote = {content, votes: 0}
    console.log(newAnecdote)
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}
   
export const voteAnecdote = async (votedA) => {
    const url = baseUrl.concat('/').concat(votedA.id)
    const response = await axios.put(url, votedA)
    console.log(response.data)
    return response.data
}