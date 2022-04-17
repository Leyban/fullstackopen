import { useEffect, useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import Numbers from './Numbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then((response)=>{
      const data = response.data;
      setPersons(data);
    })
  },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filtered, setFiltered] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

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

    const alertSimilarName = () => {
      alert(`${newName} is already added to the phonebook`)
    }

    persons.map(person => {
      if (person.name === newName) {
        terminateSubmit = true;
        return alertSimilarName()
      }
    })
    if (terminateSubmit === true) { return }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson));
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
      <Filter nameFilter={nameFilter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <Form newName={newName} 
            handleInputName={handleInputName} 
            newNumber={newNumber} 
            handleInputNumber={handleInputNumber} 
            handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Numbers filtered={filtered} persons={persons} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App