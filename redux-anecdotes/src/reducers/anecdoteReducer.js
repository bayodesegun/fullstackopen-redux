const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sorted = (_state) => {
  let state = [ ..._state ]
  state.sort((a, b) => b.votes - a.votes)
  return state
}

export const initialState = sorted(anecdotesAtStart.map(asObject))

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: { content }
  }
}

const reducer = (state = initialState, action) => {
  let reducedState = state
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      reducedState = state.map((anecdote) => {
        if (anecdote.id === id) {
          return {
           ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      break
    }
    case 'CREATE': {
      const content = action.payload.content
      const newAnectode = {
        content,
        id: getId(),
        votes: 0
      }
      reducedState = state.concat(newAnectode)
      break
    }
  }
  return sorted(reducedState)
}

export default reducer
