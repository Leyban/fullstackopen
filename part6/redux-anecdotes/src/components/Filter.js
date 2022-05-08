import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {

    const handleFilter = (event) => {
        props.setFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }


    return (
        <div style={style}>
            filter:
            <input type='text' onChange={handleFilter} />
        </div>
    );
}



export default connect(null, { setFilter })(Filter)