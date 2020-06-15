import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Finder = ({handleSearchChange, value}) => {
  return(
    <div>Find Countries <input onChange={handleSearchChange} value={value} /></div>
  )
}

const Result = ({filteredCountries}) => {
  let result;
  // console.log("these are the filtered countries", filteredCountries);
  if (filteredCountries.length > 10){
    result = <p>Too many mtches, specify another filter</p>
  } else if (filteredCountries.length <=10 && filteredCountries.length >1){
    result = <div>{filteredCountries.map((x) => x.name)}</div>
  } else if(filteredCountries.length === 1){
    result = (
      <div>
        <h1>{filteredCountries[0].name}</h1>
        <div>{filteredCountries.capital}</div>
      </div>
    )
  }

  return(
    <div>
      {result}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) =>{
    setSearch(event.target.value)
    console.log('target value is: ', event.target.value);
    
    console.log("search value", search)
    searchCountries();
  }

  const searchCountries = () =>{
    const filteredCountries = countries.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));
    setResults(filteredCountries);
  }

  return(
    <div>
    Find Countries <input onChange={handleSearchChange} value={search} />
    <Result filteredCountries={results} />
    </div>
  )
}

export default App;
