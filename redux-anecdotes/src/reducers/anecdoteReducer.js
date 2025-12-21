import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const anecdoteToUpdate = action.payload

      return state.map(anecdote => anecdote.id !== anecdoteToUpdate.id ? anecdote : anecdoteToUpdate)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteToUpdate = {...anecdote, votes:anecdote.votes+1}
    const anecdoteUpdated = await anecdoteService.update(anecdoteToUpdate)
    dispatch(updateAnecdote(anecdoteUpdated))
  }
}

export default anecdotesSlice.reducer