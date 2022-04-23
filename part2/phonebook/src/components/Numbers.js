const Numbers = ({filtered, filteredPersons, persons, handleDelete }) => {
    return (  
        <div>{filtered  ? filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id, person.name)}>delete</button></p>)
                        : persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id, person.name)}>delete</button></p>)}</div>
    );
}
 
export default Numbers;