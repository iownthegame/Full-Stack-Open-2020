import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Weather from './Weather'

const Country = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

  const hook = () => {
    if (!country) return

    const eventHandler = response => {
      setWeather(response.data.current)
    }

    const promise = axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
    promise.then(eventHandler)
  }

  useEffect(hook, [country && country.capital])

  return country ? (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>polulation {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="80" alt="flag" />
      <Weather capital={country.capital} weather={weather} />
    </>
  ) : null
}

export default Country
