import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
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
  const [notification, setNotification] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }

    if (persons.some(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const person = persons.find(p => p.name === newName)
        personsService
          .update(person.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== updatedPerson.id
              ? p
              : updatedPerson))
            setNotification(
              {
                message: `Updated ${person.name}`,
                type: "success"
              })
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setNotification(
              {
                message: `Information of ${person.name} has already been removed from the server`,
                type: "error"
              })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(returedPerson => {
          setPersons(persons.concat(returedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setNotification(
            {
              message: `Added ${newPerson.name}`,
              type: "success"
            })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
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

      <Notification notification={notification} />

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