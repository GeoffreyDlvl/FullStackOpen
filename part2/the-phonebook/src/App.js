import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerms, setSearchTerms] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newPhoneNumber
    }

    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id
        personsService
          .update(id, person)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id
              ? p
              : updatedPerson))
          })
      }
    } else {
      personsService
        .create(person)
        .then(returedPerson => {
          setPersons(persons.concat(returedPerson))
          setNewName('')
          setNewPhoneNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .destroy(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
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
        <Person
          key={person.id}
          person={person}
          deletePerson={deletePerson}
        />
      )}

    </div>
  )
}

export default App