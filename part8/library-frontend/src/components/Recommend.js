import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommend = ({ show, token }) => {
  const [user, setUser] = useState('')
  const [books, setBooks] = useState([])

  const [getUser, userResult] = useLazyQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getUser()
  }, [token, getUser])  // eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      const user = userResult.data.me
      setUser(user)
      if (user) {
        getBooks({ variables: { genre: user.favoriteGenre } })
      }
    }
  }, [userResult, getBooks])

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])


  if (!show || !user) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {<p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>}

      <BookTable books={books} />
    </div>
  )
}

export default Recommend
