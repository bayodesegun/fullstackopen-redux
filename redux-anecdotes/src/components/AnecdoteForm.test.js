import '@testing-library/jest-dom'
import { render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { anecdoteStore as store } from '../store'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './AnecdoteForm'
import anecdoteService from '../services/anecdotes'


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

const useDispatchMock = useDispatch
const dispatchMock = jest.fn()
useDispatchMock.mockImplementation(() => dispatchMock)


describe('<AnecdoteForm /> component', () => {
  let container, user

  beforeAll(() => {
    console.warn = jest.fn()
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
    const anecdote = 'This is a new anectdote'
    const content = { content : anecdote, votes: 0 }
    jest.spyOn(anecdoteService, 'create').mockImplementation(() => new Promise(() => content))
    const anecdoteInput = container.querySelector('input[name="anecdote"]')
    expect(anecdoteInput).not.toBe(null)
    await user.type(anecdoteInput, anecdote)
    expect(anecdoteInput.value).toBe(anecdote)
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBe(null)
    fireEvent.submit(form, { target : { anecdote : { value : anecdote }}})
    expect(anecdoteService.create).toHaveBeenCalledTimes(1)
    expect(anecdoteService.create).toHaveBeenCalledWith(content)
    expect(useDispatchMock).toHaveBeenCalled()
    expect(dispatchMock).toHaveBeenCalled()
  })
})
