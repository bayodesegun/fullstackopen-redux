import '@testing-library/jest-dom'
import { render, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../store'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'


describe('<Notification /> component', () => {
  let container

  beforeAll(() => {
    console.warn = jest.fn()
  })

  beforeEach(() => {
    container = render(
      <Provider store={store}>
        <Notification />
      </Provider>
    ).container
  })

  test('renders correctly', async () => {
    // Initial state, where notification = ''
    const notificationDiv = container.querySelector('#anecdote-notification')
    expect(notificationDiv).toBeNull()

    // Notification state changed
    const notification = 'This is a new notification'
    act(() => {
      store.dispatch(setNotification(notification))
    })
    const notificationDiv2 = container.querySelector('#anecdote-notification')
    expect(notificationDiv2.textContent).toBe(notification)
  })
})
