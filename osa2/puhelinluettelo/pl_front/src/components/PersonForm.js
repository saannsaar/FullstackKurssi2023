import React from "react";

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, name, number}) => {


    // Generoidaan lomake jolla voidana lisätä uusi henkilö ja numero listaan
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input value={name} onChange={handleNameChange}/>
        </div>

        <div>
          number: 
          <input value={number} onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit">Add</button>
        </div>

      </form>
    )
}

export default PersonForm