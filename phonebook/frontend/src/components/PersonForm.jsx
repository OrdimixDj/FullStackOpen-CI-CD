import personService from '../services/persons'

const PersonForm = ({setMessage, persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberInputChange = (event) => {
        setNewNumber(event.target.value)
    }

    const onClick = (event) => {
        event.preventDefault()

        const alreadyExistingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const alreadyExistingNumber = persons.find(person => person.number.toLowerCase() === newNumber.toLowerCase())

        if (alreadyExistingPerson) {
            if (alreadyExistingPerson.number !== newNumber) {
                if (window.confirm(alreadyExistingPerson.name + " is already added to phonebook, replace the older number with a new one?")) {
                    const changedPerson = { ...alreadyExistingPerson, number:newNumber }

                    personService
                        .update(alreadyExistingPerson.id, changedPerson)
                        .then(returnedPerson => {
                            setMessage({content:`Modified old ${returnedPerson.name} number to ${returnedPerson.number}`, type:'other'})
                            setPersons(persons.map(person => person.id !== alreadyExistingPerson.id ? person : returnedPerson))

                            setTimeout(() => {
                                setMessage({content:null, type:null})
                            }, 5000)
                        })
                        .catch(() => {
                            setMessage({content:`Information of ${alreadyExistingPerson.name} has already been removed from server`, type:'error'})
                            
                            setPersons(persons.filter(person => person.id !== alreadyExistingPerson.id))
                            
                            setTimeout(() => {
                                setMessage({content:null, type:null})
                            }, 5000)
                        })
                }
            }
            else {
                alert(`${newName} is already added to phonebook`)
            }
        }
        else if (alreadyExistingNumber) {
            alert(`${newNumber} is already added to phonebook`)
        }
        else {
            event.preventDefault()
            
            const personObject = {
                name: newName,
                number: newNumber,
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setMessage({content:`Added ${returnedPerson.name}`, type:'other'})
                    setPersons(persons.concat(returnedPerson))

                    setTimeout(() => {
                        setMessage({content:null, type:null})
                    }, 5000)
                })
                .catch(error => {
                    const errorMessage = error.response.data.error
                    setMessage({content:errorMessage, type:'error'})
            
                    setTimeout(() => {
                        setMessage({content:null, type:null})
                    }, 5000)
                })
        }
    }

    return (
        <form>
            <div>name: <input onChange={handleNameInputChange} /></div>
            <div>number: <input onChange={handlePhoneNumberInputChange} /></div>
            <div><button type="submit" onClick={onClick}>add</button></div>
        </form>
    )
}

export default PersonForm