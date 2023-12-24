import deepFreeze from 'deep-freeze'
import filterReducer from './filterReducer'


const initialState = ''

describe('Filter reducer', () => {

  test('returns a proper initial filter when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = filterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('properly changes the filter', () => {
    const payload = 'and'
    const action = {
      type: 'searchFilter/changeFilter',
      payload
    }
    const state = initialState

    deepFreeze(state)
    const newState = filterReducer(state, action)
    expect(newState).toBe(payload)
  })
})
