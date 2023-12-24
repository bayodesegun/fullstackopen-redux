import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  /* The `useSelector` hook is used to extract data from the Redux store. In this case, it is
  extracting the `anecdotes` and `searchFilter` state from the Redux store. */
  const anecdoteList = useSelector(({anecdotes, searchFilter}) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  /**
   * The vote function dispatches an action to vote for an anecdote and sets a timed notification with
   * the voted anecdote's content.
   */
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setTimedNotification(`You voted "${anecdote.content}"`, 5))
  }

  return (
    <div>
      {anecdoteList.map(anecdote =>
        <div key={anecdote.id} className='anecdote'>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
