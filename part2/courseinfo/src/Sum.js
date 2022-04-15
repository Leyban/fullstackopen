const Sum = ({parts}) => {
    let total = parts.reduce((accumulator,part) => {return accumulator + part.exercises},0);
    return (  
        <p><b>total of {total} exercises</b></p>
    )
}
 
export default Sum;