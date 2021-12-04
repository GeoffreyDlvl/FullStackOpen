import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerms, setSearchTerms] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const person = {
      name: newName,
      number: newPhoneNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewPhoneNumberChange = (event) => setNewPhoneNumber(event.target.value)
  const handleSearchTermsChange = (event) => setSearchTerms(event.target.value)


  const personsToShow = searchTerms === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(searchTerms))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchTerms={searchTerms}
        handleSearchTermsChange={handleSearchTermsChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewPhoneNumberChange={handleNewPhoneNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      {personsToShow.map(person =>
        <Person key={person.id} person={person} />
      )}

    </div>
  )
}

export default App