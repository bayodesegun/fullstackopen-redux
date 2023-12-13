import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../reducers/anecdoteReducer'
import AnecdoteForm from './AnecdoteForm'

describe('<AnecdoteForm /> component tests', () => {
  let container
  let store = createStore(reducer)

  beforeAll(() => {
    console.warn = jest.fn()
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <AnecdoteForm />
      </Provider>
    ).container
  })

  test('renders correctly', async () => {
    const createNew = screen.getByText('create new')
    expect(createNew).not.toBeNull()
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBeNull()
  })

  test('Can create an anecdote', async () => {
    const initialDotes = store.getState()
    const user = userEvent.setup()
    const anecdoteInput = container.querySelector('input[name="anecdote"]')
    expect(anecdoteInput).not.toBe(null)
    const anecdote = 'This is a new anectdote'
    await user.type(anecdoteInput, anecdote)
    expect(anecdoteInput.value).toBe(anecdote)
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBe(null)
    fireEvent.submit(form, { target : { anecdote : { value : anecdote }}})
    const finalDotes = store.getState()
    expect(finalDotes).toHaveLength(initialDotes.length + 1)
  })
})
