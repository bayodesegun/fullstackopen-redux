import deepFreeze from 'deep-freeze'
import anecdoteReducer, { initializeAnecdotes, createAnecdote } from './anecdoteReducer'
import { initialState } from '../test/data'
import anecdoteService from '../services/anecdotes'
import { dispatchMock } from '../test/mocks'


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

  test('allows a given anecdote to be appended', () => {
    const data = {
      content: 'This is a new anecdote',
      votes: 0
    }
    const action = {
      type: 'anecdotes/appendAnecdote',
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

  test('can initialize anecdotes using the Redux Thunk method', async () => {
    jest.spyOn(anecdoteService, 'getAll').mockImplementation(async () => {
      return initialState
    })
    const action = {
      type: 'anecdotes/setAnecdotes',
      payload: initialState
    }
    await initializeAnecdotes()(dispatchMock)
    expect(anecdoteService.getAll).toHaveBeenCalled()
    expect(dispatchMock).toHaveBeenCalledWith(action)
  })

  test('can create anectode using the Redux Thunk method', async () => {
    const content = { content: 'This is a new anecdote', votes: 0 }
    jest.spyOn(anecdoteService, 'create').mockImplementation(async () => {
      return content
    })
    const action = {
      type: 'anecdotes/appendAnecdote',
      payload: content
    }
    await createAnecdote(content)(dispatchMock)
    expect(anecdoteService.create).toHaveBeenCalledWith(content)
    expect(dispatchMock).toHaveBeenCalledWith(action)
  })
})
