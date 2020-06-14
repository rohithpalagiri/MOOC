import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleSearchChange, value}) => {
  return (
    <div>filter shown with <input onChange={handleSearchChange} value={value} /> </div>
  )
}

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({searchResult}) =>{
  return(
    <div>
        {searchResult.map((x) => <li key={x.name}>{x.name} {x.number}</li>)}
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showFiltered, setShowFiltered ] = useState('false')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (e) =>{
    e.preventDefault();
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) =>{
    e.preventDefault();
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) =>{
    
    setNewSearch(e.target.value);

    if(newSearch.length){
      setShowFiltered(true);
    } else{
      setShowFiltered(false); 
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    const inPersons = persons.some((x) => x.name === personObject.name);

    if(inPersons){

      alert(`${newName} is already added to the phonebook`);
      return;
      
    } else{
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  }

  const searchResult = showFiltered ? 
  persons.filter((x) => {
    return x.name.toLowerCase().includes(newSearch.toLowerCase());
  }) 
  : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} value={newSearch} />
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} nameValue={newName} numberValue={newNumber}/>
      <h2>Numbers</h2>
      <Persons searchResult={searchResult}/>
    </div>
  )
}

export default App