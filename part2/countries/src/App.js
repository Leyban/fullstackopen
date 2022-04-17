import { useEffect, useState } from "react";
import axios from 'axios';
import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

function App() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [displayMode, setDisplayMode] = useState('NONE');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
        setLoading(false)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
      setDisplayMode('NONE');
      return setSearchResult([]);
    }
    const searchRegExp = new RegExp(`${event.target.value}`, 'i');
    const resultPreEvaluation = countries.filter(country => searchRegExp.test(country.name.common))

    if (resultPreEvaluation.length === 0) {
      setDisplayMode('NONE');
    } else if (resultPreEvaluation.length===1){
      setDisplayMode('SINGLE');
    } else if (resultPreEvaluation.length<11){
      setDisplayMode('LIST')
    } else {
      setDisplayMode('MANY')
    }
    setSearchResult(resultPreEvaluation);
  }

  return (
    <div className="App">
      {!loading && 
      <div>
        find countries:
        <input type="text"
          value={search}
          onChange={(event) => handleSearch(event)}
        />
      </div>}
      {loading && <p>loading...</p>}
      {displayMode==='SINGLE' && 
        <CountryDetails country={searchResult[0]} />
      }
      {displayMode==='LIST' && 
        <CountryList countries={searchResult} />
      }
    </div>
  );
}

export default App;
