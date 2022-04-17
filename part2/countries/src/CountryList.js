import ListItem from "./ListItem";

const CountryList = ({countries}) => {
    return (  
        <ul>
            {countries.map(country=><ListItem key={country.name.common} country={country} />)}
        </ul>
    );
}
 
export default CountryList;