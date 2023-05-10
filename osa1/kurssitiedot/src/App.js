const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

function Content(props) {
  const parts = props.parts;
  const listItems = parts.map((part) => 
  <p>{part.name} {part.exercises}</p>);
  return (
    <>{listItems}</>
  )
  
}

function Total(props) {
  const parts = props.parts;
  const listaItemit = parts.map((part) => 
  part.exercises)
  
  let sum = 0;
  for (const value of listaItemit) {
    sum += value;
  }
  return (
   <p>Total of exercises: {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>

  )
}

export default App