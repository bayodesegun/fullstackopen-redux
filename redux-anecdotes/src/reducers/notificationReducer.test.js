import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'


const initialState = ''

describe('Notification reducer', () => {

  test('returns a proper initial filter when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('properly changes the notification', () => {
    const payload = 'New notification!'
    const action = {
      type: 'notification/changeNotification',
      payload
    }
    const state = initialState

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toBe(payload)
  })
})
