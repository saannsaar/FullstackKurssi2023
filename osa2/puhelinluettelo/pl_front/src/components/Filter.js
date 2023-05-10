import React from "react";


// Generoidaan inputti johon käyttäjä voi lisätä filtterin jolla etsiä tiettyjä henkilöitä
const Filter = ({ handleFilter }) => {
    return(
        <div>
            filter shown with <input onChange={handleFilter}/>
        </div>
    )
}

export default Filter