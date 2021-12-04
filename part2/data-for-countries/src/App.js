import React, { useEffect, useState } from "react"
import axios from 'axios'

const CountryDisplay = ({ country }) => {
  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?id=524901&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setCapitalWeather(response.data)
      })
  }
  useEffect(hook, [])
  const [capitalWeather, setCapitalWeather] = useState({})

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
        alt={`flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
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
