import axios from 'axios'
import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ filterName, setFilterName ] = useState('')
  const [ countries, setCountries] = useState([])
  const [ filterCountries, setFilterCountries] = useState([])
  const [ shownCountry, setShownCountry] = useState(null)

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilterName(value)
    setShownCountry(null)

    let newCountries = value ? countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())) : []
    setFilterCountries(newCountries)
  }

  const handleCountryChange = (country) => {
    setShownCountry(country)
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
      <Countries countries={filterCountries} shownCountry={shownCountry} handleCountryChange={handleCountryChange} />
    </div>
  )
}

export default App
