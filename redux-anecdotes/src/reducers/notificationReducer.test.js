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

  test('properly sets the notification', () => {
    const payload = 'New notification!'
    const action = {
      type: 'notification/setNotification',
      payload
    }
    const state = initialState

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toBe(payload)
  })

  test('properly clears the notification', () => {
    const payload = 'New notification!'
    const actionSet = {
      type: 'notification/setNotification',
      payload
    }
    const actionClear = {
      type: 'notification/clearNotification'
    }
    const state = initialState

    deepFreeze(state)
    let newState = notificationReducer(state, actionSet)
    expect(newState).toBe(payload)
    newState = notificationReducer(state, actionClear)
    expect(newState).toBe(initialState)
  })
})
