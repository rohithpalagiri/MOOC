import React, { useState, useEffect } from 'react';
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({capital}) => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + API_KEY + '&query=' + capital)
      .then(response => {
        setWeatherData(response.data.current)
      })
  }, [capital])

  return(
    <div>
      {weatherData 
        ? <div>
          <h3>Weather in {capital}</h3>
            <div>
              temperature: {weatherData.temperature}
            </div>
            <img alt="weather_photo" src={weatherData.weather_icons} />
            <div>
              wind: {weatherData ? weatherData.wind_speed + " direction " + weatherData.wind_dir: "Data is not available"}
            </div>
          </div>
        : "Data is not available"
      }
    </div>
  )
}

const TooManyResults = () => {
  return (<div>Too many many, specify another filter</div>)
}

const ListMultipleCountries = ({ filteredCountries }) => {
  const [showInfo, setShowInfo] = useState({});

  const handleCountryClick = (id) => {
    setShowInfo(prevShowInfo => ({
      ...prevShowInfo,
      [id]: !prevShowInfo[id]
    }));
  }
  return (
    <div>

      {filteredCountries.map((x) => {
        return (
          <div>
            {x.name} <button onClick={() => handleCountryClick(x.numericCode)}>Show</button>
            {showInfo[x.numericCode] ?
              <div id={x.numericCode}>
                <div>capital {x.capital}</div>
                <div>population {x.population}</div>
                <h3>Languages</h3>
                <div>
                  {x.languages.map((x) => <div>{x.name}</div>)}
                </div>
                <img alt="flag" src={x.flag} />
              </div>
              : null}
          </div>
        )
      })}

    </div>
  )
}

const Result = ({ filteredCountries }) => {
  let result;
  if (filteredCountries.length > 10) {
    result = <TooManyResults />
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    result = <ListMultipleCountries filteredCountries={filteredCountries} />
  } else if (filteredCountries.length === 1) {
    result = (
      <div>
        <h1>{filteredCountries[0].name}</h1>
        <div>capital {filteredCountries[0].capital}</div>
        <div>population {filteredCountries[0].population}</div>
        <h3>Languages</h3>
        <div>
          {filteredCountries[0].languages.map((x) => <div>{x.name}</div>)}
        </div>
        <img alt="flag" src={filteredCountries[0].flag} />
        <Weather capital={filteredCountries[0].capital}/>

      </div>
    )
  }

  return (
    <div>
      {result}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    searchCountries();
  }, [search])

  const searchCountries = () => {
    const filteredCountries = countries.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    setResults(filteredCountries);
  }

  return (
    <div>
      Find Countries <input onChange={handleSearchChange} value={search} />
      <Result filteredCountries={results} />
    </div>
  )
}

export default App;
