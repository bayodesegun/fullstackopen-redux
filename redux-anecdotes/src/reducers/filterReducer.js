const filterAtStart = ''

export const changeFilter = (newFilter) => {
  return {
    type: 'CHANGE',
    payload: newFilter
  }
}

const reducer = (state = filterAtStart, action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.payload

    default:
      return state
  }
}

export default reducer
