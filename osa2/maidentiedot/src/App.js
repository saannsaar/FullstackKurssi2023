import { useState, useEffect } from "react";
import axios from 'axios';
import Search from "./components/Search";
import Show from "./components/Show";

const api_key = process.env.REACT_APP_API_KEY

function App() {


const [countries, setCountries] = useState([])
const [filter, setFilter] = useState("")
const [weather, setWeather] = useState(null)


useEffect(() => {
  console.log("effect")
  axios.get("https://restcountries.com/v3.1/all").then((response) => {
    console.log("promise fulfilled")
    setCountries(response.data)
  })
}, [])

const handleFilter = (event) => {
  setFilter(event.target.value)
}

const countriesShow = countries.filter((elem) => {
  return elem.name.common.toLowerCase().includes(filter.toLowerCase())
})

  return (
    <div>
      <h1>COUNTRIES</h1>
      <Search handleFilter={handleFilter}  />
      <Show countries={countriesShow} filter={filter} setFilter={setFilter} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;
