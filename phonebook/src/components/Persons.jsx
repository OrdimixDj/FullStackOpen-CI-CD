import personService from '../services/persons'

const Persons = ({ persons, setPersons, filter }) => {
  const newPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const onClick = (personToDelete) => {
    if (window.confirm('Delete ' + personToDelete.name + ' ?')) {
      personService.deletePerson(personToDelete.id).then(() => {
        const newPersons = persons.filter(
          (person) => person.id !== personToDelete.id
        )
        setPersons(newPersons)
      })
    }
  }

  return newPersons.map((person) => (
    <Person key={person.id} person={person} handleDelete={onClick} />
  ))
}

const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}
    <button type="submit" onClick={() => handleDelete(person)}>
      delete
    </button>
  </p>
)

export default Persons