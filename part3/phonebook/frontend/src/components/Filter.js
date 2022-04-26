const Filter = ({nameFilter, handleFilter}) => {
    return (  
        <div>filter shown with <input value={nameFilter} onChange={(event) => handleFilter(event)} /></div>
    );
}
 
export default Filter;