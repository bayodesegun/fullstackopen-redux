import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create} id='create-anecdote-form'>
        <div><input type='text' name='anecdote' required /></div>
        <button type='submit' id='create-anecdote'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
