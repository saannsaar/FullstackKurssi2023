import React, { useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ countries, setWeather, weather }) => {

   
  
    const api_key = process.env.REACT_APP_API_KEY
    console.log("country lat", countries[0].latlng[0])
    console.log("country lon", countries[0].latlng[1])
    console.log(countries[0])
    console.log(countries[0].capitalInfo.latlng)



    useEffect(() => {
        let lat = countries[0].capitalInfo.latlng[0]
        let lon = countries[0].capitalInfo.latlng[1]
        console.log(lat, lon)
        axios.get(` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        .then((response) => {
            console.log("weather fullfilled")
            setWeather(response.data)
        })
    }, [])

    console.log("weather okk :)")
    console.log(weather)
    console.log(weather.weather[0].icon)

    return (
        <div>
            <h1>{countries[0].name.common}</h1>
            <p key={countries[0].capital}> Capital: {countries[0].capital}
            </p>
            <p key={countries[0].area}> Area: {countries[0].area}</p>
            <h3>Languages:
            </h3>
            {Object.values(countries[0].languages).map((langu) => (
                <li key={langu}> {langu}</li>
                 ))}
                 <br></br>
           <img src={countries[0].flags.svg} style={{width:"30%", height:"30%"}}/>
           
            <h2>Weather in {countries[0].capital}</h2>
            <p> Temperature: {weather.main.temp} °C</p>
            <img src={` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Wind: {weather.wind.speed} m/s </p>
        </div>
    )
}

export default CountryInfo


