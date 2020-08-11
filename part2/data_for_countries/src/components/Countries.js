import React from 'react'

import Country from './Country'

const Countries = ({ countries, shownCountry, handleCountryChange } ) => {
  if (countries.length > 10) {
    return <div>Too many mathces, specify another filter</div>
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map(country => <div key={country.name}>{country.name} <button onClick={() => handleCountryChange(country)}>show</button></div>)}
        <Country country={shownCountry} />
      </>
    )
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return null
}

export default Countries;
