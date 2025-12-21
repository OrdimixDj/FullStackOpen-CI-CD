import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVoteAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    console.log('vote', anecdote.id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  const sortedAnecdotes = [...anecdotes].sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList