import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({country}) => {
    const languageList = Object.keys(country.languages);
    const [weather, setWeather] = useState(null);

    useEffect(()=>{
        const lat = country.capitalInfo.latlng[0];
        const lon = country.capitalInfo.latlng[1];
        const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;

        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`)
            .then((response)=>{
                setWeather(response.data);
            })
    },[])

    return (  
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languageList.map(lang=><li key={country.languages[lang]}>{country.languages[lang]}</li>)}
            </ul>
            <img src={country.flags.svg} alt={`flag of ${country.name.common}`} width='300px' />

            {weather && 
                <div>
                    <h2>Weather in {country.capital[0]}</h2>
                    <p>temperature { Math.round((weather.main.temp - 273.15) * 100) / 100 } Celcius</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            }

        </div>
    );
}
 
export default CountryDetails;