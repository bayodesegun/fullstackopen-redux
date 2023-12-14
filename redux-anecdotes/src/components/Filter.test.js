import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { filterStore as store } from '../store'
import Filter from './Filter'


describe('<Filter /> component', () => {
  let container

  beforeAll(() => {
    console.warn = jest.fn()
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <Filter />
      </Provider>
    ).container
  })

  test('renders correctly', async () => {
    const filterText = screen.getByText('filter')
    expect(filterText).not.toBe(null)
    const input = container.querySelector('input[name="anecdote_filter"]')
    expect(input).not.toBeNull()
  })

  test('updates the filter correctly', async () => {
    const user = userEvent.setup()
    const initialFilter = store.getState()
    expect(initialFilter).toBe('')
    const userInput = 'when'

    const input = container.querySelector('input')
    await user.type(input, userInput)

    const finalInput = store.getState()
    expect(finalInput).toBe(userInput)
  })
})
