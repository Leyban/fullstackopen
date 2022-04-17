import { useState } from "react";
import CountryDetails from "./CountryDetails";

const ListItem = ({country}) => {
    const [showDetails, setShowDetails] = useState(false);
    const handleShow = () => {
        setShowDetails(!showDetails);
    }

    return (  
        <li>
            {country.name.common} 
            <button onClick={()=>handleShow()}>{showDetails? 'hide' : 'show' }</button>
            {showDetails && <CountryDetails country={country} /> }
        </li>
    );
}
 
export default ListItem;