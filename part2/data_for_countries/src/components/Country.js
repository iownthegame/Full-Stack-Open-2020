import React from 'react'

const Country = ({ country }) => {
  if (!country) return null

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

export default Country;
