import axios from 'axios'
import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>polulation {country.population}</div>

      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>

      <img src={country.flag} width="120" alt="flag" />
    </>
  )
}

const Countries = ({ countries } ) => {
  if (countries.length > 10) {
    return <div>Too many mathces, specify another filter</div>
  }

  if (countries.length > 1) {
    return countries.map(country => <div key={country.name}>{country.name}</div>)
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return null
}

const App = () => {
  const [ filterName, setFilterName ] = useState('')
  const [ countries, setCountries] = useState([])
  const [ filterCountries, setFilterCountries] = useState([])

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilterName(value)

    if (!value) {
      setFilterCountries([])
      return
    }

    setFilterCountries(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())))
  }

  const hook = () => {
    const eventHandler = response => {
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }

  useEffect(hook, [])

  return (
    <div>
      <Filter value={filterName} onChange={handleFilterChange} />

      <Countries countries={filterCountries} />
    </div>
  )
}

export default App
