import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../store'
import AnecdoteList from './AnecdoteList'
import anecdoteService from '../services/anecdotes'
import * as anecdoteReducer from '../reducers/anecdoteReducer'


describe('<AnectdoteList /> component', () => {
  let container

  beforeAll(() => {
    console.warn = jest.fn()
    jest.spyOn(anecdoteReducer, 'voteAnecdote')
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <AnecdoteList />
      </Provider>
    ).container
  })

  test('renders correctly', async () => {
    const anecdoteList = store.getState().anecdotes

    const anecdotes = container.querySelectorAll('.anecdote')
    expect(anecdotes.length).toBe(anecdoteList.length)

    const anecdote = anecdotes[0]
    expect(anecdote).not.toBeNull()
    expect(anecdote.textContent).toContain(`has ${anecdoteList[0].votes}`)
    expect(anecdote.textContent).toContain(anecdoteList[0].content)
    const btn = anecdote.querySelector('button')
    expect(btn).not.toBeNull()
    expect(btn.textContent).toBe('vote')
  })

  test('can vote an anecdote', async () => {
    const user = userEvent.setup()
    const anecdote = container.querySelectorAll('.anecdote')[0]
    expect(anecdote.textContent).toContain('has 0')
    const content = store.getState().anecdotes[0]
    jest.spyOn(anecdoteService, 'update').mockImplementation(async () => ({ ...content, votes: 2}))

    const voteBtn = anecdote.querySelector('button')
    await user.click(voteBtn)
    expect(anecdote.textContent).toContain('has 2')
    expect(anecdoteReducer.voteAnecdote).toHaveBeenCalledWith(content)
  })
})
