// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create(state, action) {
      return [...state, action.payload]
    },
    update(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
        .sort((a, b) => b.votes - a.votes)
    },
    setAll(state, action) {
      return action.payload
    }
  }
})

export const { create, update, setAll } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()
    dispatch(setAll(response.sort((a, b) => b.votes - a.votes)))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.createAnecdote(content)
    dispatch(create(response))
  }
}

export const voteThisAnecdote = (anecdote) => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    const response = await anecdoteService.update(newAnecdote)
    dispatch(update(response))
  }
}