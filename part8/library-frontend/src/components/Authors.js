
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const SetBirthyear = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [nameOption, setNameOption] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (authors.length === 0) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: nameOption.value, born: parseInt(born) } })

    setNameOption(null)
    setBorn('')
  }

  return (
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
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show || !result.data) {
    return null
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

      {props.token && <SetBirthyear authors={authors.filter(author => !author.born)} />}
    </div>
  )
}

export default Authors
