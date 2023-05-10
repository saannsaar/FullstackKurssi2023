
import React from "react";


// Kurssi
const Course = ( { props } ) => {
    
    return (
        <div>
            <h1>{props.name}</h1>
            <Content propps={props.parts} />
        </div>
    )
}

// Kurssin sisältö 
const Content = ({ propps  }) => {
    const content = propps.map( ({ id, name, exercises}) => (
        <Part key = {id} 
        name={name} 
        exercises={exercises} />
       
    ));
    
    // Lasketaan yhteen tehtävien lukumäärät
    // 0 tarkoittaa että sum on alussa 0
    const yhteensa = propps.reduce((sum, ex) => sum + ex.exercises, 0);
    
    return (
        <div>
            {content}
            <p> <strong> Total of {yhteensa} exercises  </strong> </p>
        </div>
    )

}


// Yksittäinen osa sisältöä
const Part = ( { name, exercises }) => {
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

export default Course
