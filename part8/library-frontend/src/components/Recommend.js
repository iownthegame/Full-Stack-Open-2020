import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommend = ({ show, token }) => {
  const [user, setUser] = useState('')

  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)

  useEffect(() => {
    if ( userResult.data ) {
      const user = userResult.data.me
      setUser(user)
    }
  }, [userResult.data, token]) // eslint-disable-line

  if (!show || !token || !user) {
    return null
  }

  if (result.loading || userResult.loading)  {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  books = books.filter(book => book.genres.includes(user.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      {<p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>}

      <BookTable books={books} />
    </div>
  )
}

export default Recommend
