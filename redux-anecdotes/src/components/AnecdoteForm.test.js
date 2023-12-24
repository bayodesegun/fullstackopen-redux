import '@testing-library/jest-dom'
import { render, screen, fireEvent, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { anecdoteStore as store } from '../store'
import AnecdoteForm from './AnecdoteForm'
import anecdoteService from '../services/anecdotes'
import * as anecdoteReducer from '../reducers/anecdoteReducer'


describe('<AnecdoteForm /> component', () => {
  let container, user

  beforeAll(() => {
    console.warn = jest.fn()
    jest.spyOn(anecdoteReducer, 'createAnecdote')
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <AnecdoteForm />
      </Provider>
    ).container
    user = userEvent.setup()
  })

  test('renders correctly', async () => {
    const createNew = screen.getByText('create new')
    expect(createNew).not.toBeNull()
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBeNull()
  })

  test('can create an anecdote', async () => {
    const initialAnecdotes = store.getState()
    const anecdote = 'This is a new anectdote'
    const content = { content : anecdote, votes: 0 }
    jest.spyOn(anecdoteService, 'create').mockImplementation(async () => ({ ...content, id: 222}))
    const anecdoteInput = container.querySelector('input[name="anecdote"]')
    expect(anecdoteInput).not.toBe(null)
    await act(async () => {
      await user.type(anecdoteInput, anecdote)
      expect(anecdoteInput.value).toBe(anecdote)
    })
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBe(null)
    let fakeEvent = { target : { anecdote : { value : anecdote }}}
    await act(async () => {
      fireEvent.submit(form, fakeEvent)
    })
    expect(anecdoteReducer.createAnecdote).toHaveBeenCalledWith(content)
    const finalAnectdotes = store.getState()
    expect(finalAnectdotes.length).toBe(initialAnecdotes.length + 1)
  })
})
