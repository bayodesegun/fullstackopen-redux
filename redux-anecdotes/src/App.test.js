import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import * as anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'


const checkNotification = (notification, container) => {
  let notificationDiv = container.querySelector('#anecdote-notification')
  expect(notificationDiv.textContent).toBe(notification)
  act(() => {
    jest.advanceTimersByTime(5000)
  })
  notificationDiv = container.querySelector('#anecdote-notification')
  expect(notificationDiv).toBe(null)
}

describe('<App /> root component (integration)', () => {
  let container, user

  beforeAll(() => {
    console.warn = jest.fn()
  })

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(anecdoteReducer, 'initializeAnecdotes')
    act(() => {
      container = render(
        <Provider store={store}>
          <App />
        </Provider>
      ).container
    })
    user = userEvent.setup({ delay: null })
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  test('initializes anecdotes by calling the Redux Thunk', async () => {
    screen.getAllByText('has 0')
    expect(anecdoteReducer.initializeAnecdotes).toHaveBeenCalled()
  })

  test('renders correctly', async () => {
    const title = screen.getByText('Anecdotes')
    expect(title).not.toBeNull()

    const filterText = screen.getByText('filter')
    expect(filterText).not.toBe(null)
    const input = container.querySelector('input[name="anecdote_filter"]')
    expect(input).not.toBeNull()

    const anecdotes = container.querySelectorAll('.anecdote')
    expect(anecdotes.length).toBeGreaterThan(0)

    const anecdote = anecdotes[0]
    expect(anecdote).not.toBeNull()
    expect(anecdote.textContent).toContain('has 0')
    const btn = anecdote.querySelector('button')
    expect(btn).not.toBeNull()
    expect(btn.textContent).toBe('vote')

    const createNew = screen.getByText('create new')
    expect(createNew).not.toBeNull()
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBeNull()
  })

  test('can vote an anecdote', async () => {
    const _anecdote = store.getState().anecdotes[0]
    const anecdote = container.querySelectorAll('.anecdote')[0]
    expect(anecdote.textContent).toContain('has 0')
    jest.spyOn(anecdoteService, 'update').mockImplementation(async () => ({ ..._anecdote, votes: 1}))

    const voteBtn = anecdote.querySelector('button')
    await user.click(voteBtn)
    expect(anecdoteService.update).toHaveBeenCalled()
    screen.getByText('has 1')
    expect(anecdote.textContent).toContain('has 1')

    const notification = `You voted "${anecdote.textContent.split('has')[0]}"`
    checkNotification(notification, container)
  })

  test('can create an anecdote', async () => {
    const initialAnecdotes = container.querySelectorAll('.anecdote')
    const anecdoteInput = container.querySelector('input[name="anecdote"]')
    expect(anecdoteInput).not.toBe(null)
    const anecdote = 'This is a new anectdote'
    const content = { content : anecdote, votes: 0 }
    jest.spyOn(anecdoteService, 'create').mockImplementation(async () => ({...content, id: 333}))

    await act(async () => {
      await user.type(anecdoteInput, anecdote)
      expect(anecdoteInput.value).toBe(anecdote)
    })
    const form = container.querySelector('#create-anecdote-form')
    expect(form).not.toBe(null)

    await act(async () => {
      fireEvent.submit(form, { target : { anecdote : { value : anecdote }}})
    })
    screen.getByText(anecdote)
    const finalAnectdotes = container.querySelectorAll('.anecdote')
    expect(finalAnectdotes.length).toBe(initialAnecdotes.length + 1)

    const notification = `You created "${anecdote}"`
    checkNotification(notification, container)
  })

  test('filter works correctly', async () => {
    const initialAnecdotes = container.querySelectorAll('.anecdote')
    const filter = store.getState().anecdotes[0].content.split(' ')[0]

    const input = container.querySelector('input[name="anecdote_filter"]')
    await act(async () => {
      await user.type(input, filter)
      expect(input.value).toBe(filter)
    })

    const finalAnectdotes = container.querySelectorAll('.anecdote')
    expect(finalAnectdotes.length).toBeLessThan(initialAnecdotes.length)
  })
})
