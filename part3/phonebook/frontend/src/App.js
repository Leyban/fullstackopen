import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personsServices from './services/persons'
import Notification from './components/Notification'
import ErrorAlert from './components/ErrorAlert'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filtered, setFiltered] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleFilter = (event) => {
    setNameFilter(event.target.value);

    if (event.target.value === '') { return setFiltered(false) }
    const filterTest = new RegExp(`${event.target.value}`, 'i')
    setFilteredPersons(persons.filter(person => filterTest.test(person.name)));
    setFiltered(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let terminateSubmit = false;

    const alertSimilar = () => {
      alert(`${newName} is already added to the phonebook`)
    }

    persons.map(person => {
      if (person.name === newName) {
        if (person.number === newNumber) {
          alertSimilar()
        } else {
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
            const updatedPerson = { ...person, number: newNumber }
            personsServices
              .update(person.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                setNewName('');
                setNewNumber('');
                setNotificationMessage(`Updated ${returnedPerson.name}'s number`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000)
              })
              .catch(error => {
                setErrorMessage(error.response.data.error)
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
          }
        }
        terminateSubmit = true;
      }
    })

    if (terminateSubmit) { return }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`${name} was deleted`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(err => {
          setErrorMessage(`Information for ${name} has already been deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorAlert message={errorMessage} />
      <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <Form
        newName={newName}
        handleInputName={handleInputName}
        newNumber={newNumber}
        handleInputNumber={handleInputNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Numbers
        filtered={filtered}
        persons={persons}
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App