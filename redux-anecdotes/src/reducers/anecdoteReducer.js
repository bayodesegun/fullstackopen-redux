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
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const reducedState = state.map((anecdote) => {
        if (anecdote.id === updatedAnecdote.id) {
          return updatedAnecdote
        }
        return anecdote
      })
      return sorted(reducedState)
    },
    appendAnecdote(state, action) {
      const content = action.payload
      const reducedState = state.concat(content)
      return sorted(reducedState)
    },
    setAnecdotes(state, action) {
      return sorted(action.payload)
    }
  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

/**
 * The function initializes anecdotes by fetching them from a service and dispatches an action to set
 * the anecdotes.
 */
export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

/**
 * The function creates an anecdote by calling an asynchronous service and dispatches an action to
 * append the anecdote to the state.
 * @param content - The `content` parameter is the text or description of the anecdote that you want to
 * create.
 */
export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.create(content)
  dispatch(appendAnecdote(anecdote))
}

/**
 * The voteAnecdote function updates the votes of an anecdote and dispatches an action to update the
 * anecdote in the Redux store.
 * @param content - The `content` parameter is an object that represents an anecdote. It typically has
 * properties such as `id`, `content`, and `votes`.
 */
export const voteAnecdote = (content) => async (dispatch) => {
  const anecdote = { ...content, votes: content.votes + 1 }
  const updatedAnecdote = await anecdoteService.update(anecdote)
  dispatch(updateAnecdote(updatedAnecdote))
}

export default anecdoteSlice.reducer
