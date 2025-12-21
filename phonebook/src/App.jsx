import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const Notification = ({ message }) => {
  const messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message.content === null) {
    return null
  }

  if (message.content === '') {
    return null
  }

  if (message.type === 'error') {
    messageStyle.color = 'red'
  }
  else {
    messageStyle.color = 'green'
  }

  return (
    <div style={messageStyle}>
      <b>{message.content}</b>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({ content: '', type: '' })


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm message={message} setMessage={setMessage} persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filter={newFilter} />
    </div>
  )
}

export default App