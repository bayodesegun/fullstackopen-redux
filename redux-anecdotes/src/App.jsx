import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    const action = {
      type: 'VOTE',
      payload: { id }
    }
    dispatch(action)
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const action = {
      type: 'CREATE',
      payload: { content }
    }
    dispatch(action)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} className='anecdote'>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote} id='create-anecdote-form'>
        <div><input type='text' name='anecdote' /></div>
        <button type='submit' id='create-anecdote'>create</button>
      </form>
    </div>
  )
}

export default App
