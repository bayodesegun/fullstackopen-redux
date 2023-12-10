import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'

describe('<App /> component tests', () => {
  let container
  let store = createStore(reducer)

  beforeAll(() => {
    console.warn = jest.fn()
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <App />
      </Provider>
    ).container
  })

  test('renders correctly', async () => {
    const title = screen.getByText('Anecdotes')
    expect(title).toBeDefined()

    const anecdotes = container.querySelectorAll('.anecdote')
    expect(anecdotes.length).toBeGreaterThan(0)

    const anecdote = anecdotes[0]
    expect(anecdote).toBeDefined()
    expect(anecdote.textContent).toContain('has 0')
    const btn = anecdote.querySelector('button')
    expect(btn).toBeDefined()
    expect(btn.textContent).toBe('vote')

    const createNew = screen.getByText('create new')
    expect(createNew).toBeDefined()
    const form = container.querySelector('#create-anecdote-form')
    expect(form).toBeDefined()

  })

  test('Can vote an anecdote', async () => {
    const user = userEvent.setup()

    const anecdote = container.querySelectorAll('.anecdote')[0]
    expect(anecdote.textContent).toContain('has 0')

    const voteBtn = anecdote.querySelector('button')
    await user.click(voteBtn)
    expect(anecdote.textContent).toContain('has 1')
  })
})