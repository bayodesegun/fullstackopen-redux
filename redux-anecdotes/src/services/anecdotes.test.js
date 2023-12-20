import axios from 'axios'
import anecdoteService from './anecdotes'
import { initialState } from '../reducers/anecdoteReducer'


describe('Anecdote service', () => {
  test('getAll works properly', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: initialState }))
    const data = await anecdoteService.getAll()
    expect(data).toEqual(initialState)
  })

  test('create works properly', async () => {
    const content = { content: 'test content', votes: 0 }
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: content }))
    const data = await anecdoteService.create(content)
    expect(data).toEqual(content)
  })
})
