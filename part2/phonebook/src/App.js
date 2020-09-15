import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)
    if (person) {
      const { id } = person
      const res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!res) return

      const changedPerson = { ...person, number: newNumber }

      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    const res = window.confirm(`Delete ${name} ?`);
    if (!res) return;

    personService
      .remove(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const showPersons = filterName ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterName} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={showPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
