
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [nameOption, setNameOption] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: nameOption.value, born: parseInt(born) } })

    setNameOption(null)
    setBorn('')
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {props.token &&
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              <Select
                value={nameOption}
                onChange={(selectedOption) => setNameOption(selectedOption)}
                options={authors.map(author => { return { value: author.name, label: author.name } })}
              />
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors
