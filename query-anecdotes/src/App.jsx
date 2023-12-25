import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './notificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const newAnecdotes = anecdotes.map(a => a.id === anecdote.id ? anecdote : a)
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1  }
    updateAnecdoteMutation.mutate(newAnecdote)
    dispatch({ type: 'set', payload: `You voted for '${anecdote.content}'`})
    setTimeout(() => dispatch({ type: 'clear' }), 5000)
  }

  const anecdoteQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (anecdoteQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (anecdoteQuery.isError) {
    return <div>Anecdote service not available due to problems in the server</div>
  }

  const anecdotes = anecdoteQuery.data.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
