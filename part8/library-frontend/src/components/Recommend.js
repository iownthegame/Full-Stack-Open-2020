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
    if (token) {
      getUser()
    }
  }, [token])  // eslint-disable-line

  useEffect(() => {
    if (userResult.data) {
      const currentUser = userResult.data.me
      if (currentUser) {
        setUser(currentUser)
        getBooks({ variables: { genre: currentUser.favoriteGenre } })
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
