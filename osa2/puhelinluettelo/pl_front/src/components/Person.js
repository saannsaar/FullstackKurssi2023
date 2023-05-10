import React from "react";

const Person = ( { persons, filtter, handleDelete }) => {

    // Eka filteröidään persons läpi ja tsekataan onko filtteri tyhjä jos on niin sitten generoidaan
    // kaikista henkilöistä li elementit jos filtterissä on jotain katsotaan sisältääkö 
    // henkilö sen ja jos sisältää sitten generoidaan vaan niistä li elementit
    return (
        <div>
            
           {persons.filter((person) => {
            if (filtter === "") {
                return person
            } else if (person.name.toLowerCase().includes(filtter.toLowerCase())) {
                return person
            }
           }).map((person) => (
            <li key={person.name}> <strong>{person.name}</strong> {person.number} 
                <button onClick={() => handleDelete(person)}>Delete</button>
             </li> 
           ))}
       
        </div>
    )
}

export default Person