import deepFreeze from 'deep-freeze'
import anecdoteReducer, { initialState } from './anecdoteReducer'


describe('Anecdote reducer', () => {

  test('returns a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('sorts the states', () => {
    const state = [
      initialState[0], initialState[1]
    ]
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: initialState[1].id
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState[0].content).toEqual(initialState[1].content)
  })

  test('allows a given anecdote to be voted', () => {
    const anecdote = initialState[0]
    const action = {
      type: 'anecdotes/voteAnecdote',
      payload: anecdote.id
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    const newAnectode = newState.find(id => id.id === anecdote.id)
    expect(newAnectode.votes).toBe(anecdote.votes + 1)
  })

  test('allows a given anecdote to be CREATED', () => {
    const data = {
      content: 'This is a new anecdote',
      votes: 0
    }
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: data
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState.length).toBe(state.length + 1)
    expect(newState.filter(anect => anect.content === data.content).length).toBe(1)
  })

  test('can set anecdotes', () => {
    const anecdotes = []
    const action = {
      type: 'anecdotes/setAnecdotes',
      payload: anecdotes
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState.length).toBe(anecdotes.length)
  })
})
