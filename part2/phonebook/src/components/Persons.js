import React from 'react'

const Persons = ({ persons, onDelete }) => persons.map((person) => {
  return (
    <div key={person.name}>{`${person.name} ${person.number}`} <button onClick={() => onDelete(person.id, person.name)}>delete</button></div>
  )
})

export default Persons
