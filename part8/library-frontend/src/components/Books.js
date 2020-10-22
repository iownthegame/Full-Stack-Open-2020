import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  let books = result.data.allBooks
  const genres_arrays = books.map(book => book.genres)
  const genres = [].concat.apply([], genres_arrays)
  const distinctGenres = [...new Set(genres)]

  if (genre) {
    books = books.filter(book => book.genres.includes(genre))
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}

      <BookTable books={books} />

      {distinctGenres.map(g =>
        <button onClick={()=>setGenre(g)} key={g}>{g}</button>
      )}
      <button onClick={()=>setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
