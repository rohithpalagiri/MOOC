import React, { useState, useEffect } from 'react'
import phoneService from './services/phone'
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

const Persons = ({searchResult, handleDelete}) =>{
  return(
    <div>
        {searchResult.map((x) => 
        <li key={x.name}>{x.name} {x.number} <button onClick={() => handleDelete(x)}>delete</button></li>)}
    </div>
  )
}

const Notification = ({message, type}) => {
  if(message === null){
    return null
  }
  return(
    <div className={type === 'success' ? "success" :  "error"}>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showFiltered, setShowFiltered ] = useState('false')
  const [ message, setMessage] = useState('')
  const [ messageType, setMessageType] = useState(null)

  useEffect(() => {
    axios
      .get(phoneService.baseUrl)
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

      const findUpdatedContact = persons.find((x) => x.name === personObject.name)

      if(window.confirm(`Would you like to update the number for ${personObject.name}?`)){
        phoneService.updateContact(findUpdatedContact.id, personObject)
        .then(response => {
          setPersons(persons.map((person) => person.id !== findUpdatedContact.id ? person : response.data))
          setMessage(`Updated ${response.data.name}`);
          setMessageType(`success`);
          setTimeout(() =>{
            setMessage(null);
          }, 2000)
        })
        .catch(response =>{
          setMessage(`Information of ${findUpdatedContact.name} has already been deleted`);
          setMessageType(`fail`);
          setTimeout(() =>{
            setMessage(null);
          }, 2000)
        })
      }
      
    } else{
      phoneService.createContact(personObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
          setMessage(`Added ${returnedContact.name}`);
          setMessageType(`success`);
          setTimeout(() =>{
            setMessage(null);
          }, 2000)
          setNewName('');
        })
    }
  }

  const handleDelete = (x) => {
    if(window.confirm(`Delete ${x.name}?`)){
      return phoneService.deleteContact(x.id)
      .then(deletedContact => {
        const updatedPersons = persons.filter(person => person.id !== x.id)
        setPersons(updatedPersons)
      })
    } else {
      return;
    }
  }

  const searchResult = showFiltered ? 
  persons.filter((x) => {
    return x.name.toLowerCase().includes(newSearch.toLowerCase());
  }) 
  : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={messageType}/>
      <Filter handleSearchChange={handleSearchChange} value={newSearch} />
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} nameValue={newName} numberValue={newNumber}/>
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} searchResult={searchResult}/>
    </div>
  )
}

export default App