import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'
import { initialState } from './anecdoteReducer'


describe('anecdote reducer', () => {

  test('returns a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('allows a given anecdote to be voted', () => {
    const anecdote = initialState[0]
    const action = {
      type: 'VOTE',
      payload:{
        id: anecdote.id
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    const newAnectode = newState.find(id => id.id === anecdote.id)
    expect(newAnectode.votes).toBe(anecdote.votes + 1)
  })

  test('allows a given anecdote to be CREATED', () => {
    const content = 'This is a new anecdote'
    const action = {
      type: 'CREATE',
      payload: {
        content
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState.filter(anect => anect.content === content).length).toBe(1)
  })
})
