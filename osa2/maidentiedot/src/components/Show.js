import React from "react";
import CountryInfo from "./CountryInfo";

const Show = ({ countries, setFilter, setWeather, weather }) => {


    return (
       
        <div>
             {countries.length === 1 ? (
                <CountryInfo countries={countries} weather={weather} setWeather={setWeather}/>
                ) : countries.length > 10 ? (
                <p><strong>Too many matches, specify another filter</strong></p>
             ): (
           countries.map((country) => (
            <div key={country.cca2}>
                <p>{country.name.common} <button onClick={() => setFilter(country.name.common)}>Show</button></p>
            </div>
          )))}
        </div>
    )
}

export default Show