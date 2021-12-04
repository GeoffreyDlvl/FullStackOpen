import React, { useEffect, useState } from "react"
import axios from 'axios'

const WeatherDisplay = ({ weather }) => {
  if (weather === null) {
    return <></>
  }

  const getDirection = (deg) => {
    if (deg > 348.75 && deg <= 11.25) return 'N'
    if (deg > 11.25 && deg <= 33.75) return 'NNE'
    if (deg > 33.75 && deg <= 56.25) return 'NE'
    if (deg > 56.25 && deg <= 78.75) return 'ENE'
    if (deg > 78.75 && deg <= 101.25) return 'E'
    if (deg > 101.25 && deg <= 123.75) return 'ESE'
    if (deg > 123.75 && deg <= 146.25) return 'SE'
    if (deg > 146.25 && deg <= 168.75) return 'SSE'
    if (deg > 168.75 && deg <= 191.25) return 'S'
    if (deg > 191.25 && deg <= 213.75) return 'SSW'
    if (deg > 213.75 && deg <= 236.25) return 'SW'
    if (deg > 236.25 && deg <= 258.75) return 'WSW'
    if (deg > 258.75 && deg <= 281.25) return 'W'
    if (deg > 281.25 && deg <= 326.25) return 'NW'
    if (deg > 326.25 && deg <= 348.75) return 'NNW'
  }

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <div><b>temperature: </b>{weather.main.temp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <div><b>wind: </b>{weather.wind.speed} mph direction {getDirection(weather.wind.deg)}</div>
    </div >
  )
}

const CountryDisplay = ({ country }) => {
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setCapitalWeather(response.data)
      })
  }
  useEffect(hook, [country])
  const [capitalWeather, setCapitalWeather] = useState(null)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {Object
          .keys(country.languages)
          .map(key =>
            <li key={key}>
              {country.languages[key]}
            </li>
          )}
      </ul>
      <img src={country.flags.png}
        alt={`flag of ${country.name.common}`}
      />
      <WeatherDisplay weather={capitalWeather} />
    </div>
  )
}

const SearchResult = ({ countries, selectedCountry, setSelectedCountry }) => {

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }
  const compare = (a, b) => {
    const nameA = a.name.common.toLowerCase()
    const nameB = b.name.common.toLowerCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  if (countries.length === 0) {
    return <></>
  } else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1 && selectedCountry === null) {
    return (
      <>
        {countries.sort(compare).map(country =>
          <div key={country.area}>
            {country.name.common}
            <button onClick={() => handleShowClick(country)}>
              show
            </button>
          </div>)
        }
      </>
    )
  }

  return <CountryDisplay
    country={selectedCountry === null
      ? countries[0]
      : selectedCountry}
  />
}

function App() {

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const [countries, setCountries] = useState([])
  const [searchTerms, setSearchTerms] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearchChange = (event) => {
    setSearchTerms(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = searchTerms === ''
    ? countries
    : countries.filter(country =>
      country
        .name
        .common
        .toLowerCase()
        .includes(searchTerms))

  return (
    <div>
      find countries <input
        input={searchTerms}
        onChange={handleSearchChange} />

      <SearchResult
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}

export default App;
