import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
