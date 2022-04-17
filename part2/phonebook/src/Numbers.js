const Numbers = ({filtered, filteredPersons, persons }) => {
    return (  
        <div>{filtered  ? filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
                        : persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>
    );
}
 
export default Numbers;