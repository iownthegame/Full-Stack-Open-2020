import React from 'react'

const Weather = ({ capital, weather }) => {
  return weather ? (
    <>
      <h2>Weather in {capital}</h2>
      <div><b>temperature: </b>{weather.temperature} Celcius</div>
      <div><img src={weather.weather_icons[0]} alt="weather-icon" width="120" /></div>
      <div><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</div>
    </>
  ) : null
}

export default Weather
