import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {distinctGenres.map(g =>
        <button onClick={()=>setGenre(g)} key={g}>{g}</button>
      )}
      <button onClick={()=>setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
