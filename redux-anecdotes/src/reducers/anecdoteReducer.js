import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { initialState } from '../test/data'


const sorted = (_state) => {
  let state = [ ..._state ]
  state.sort((a, b) => b.votes - a.votes)
  return state
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: window === undefined ? [] : sorted(initialState),
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const reducedState = state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
           ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      return sorted(reducedState)
    },
    createAnecdote(state, action) {
      const content = action.payload
      const reducedState = state.concat(content)
      return sorted(reducedState)
    },
    setAnecdotes(state, action) {
      return sorted(action.payload)
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export default anecdoteSlice.reducer
