const Form = ({newName, handleInputName, newNumber, handleInputNumber, handleSubmit}) => {
    return (  
        <form onSubmit={(event) => handleSubmit(event)}>
            <div>
                <p>name: <input type='text' value={newName} onChange={(event) => handleInputName(event)} /></p>
                <p>number: <input type='tel' value={newNumber} onChange={(event) => handleInputNumber(event)} /></p>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}
 
export default Form;