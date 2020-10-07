import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
  const filterAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.includes(filter))

  return (
    <>
      {filterAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
