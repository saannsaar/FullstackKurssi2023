import { useState } from 'react'

const Button = (props) => {
  <button onClick={props.handleClick}>
    next anecdote
  </button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  let p = anecdotes.length
  const [pisteet, setPisteet] = useState(Array(p).fill(0))
  const [maxpisteet, setMaxPisteet] = useState(0)

 

    
const onkoIsoin = (a) => {
  let maxkohta = 0
  let maxnumero = 0
  for (let i = 0; i < p; i++) {
    if (a[i] > maxkohta) {
      maxkohta = a[i]
      maxnumero = i
    }

  } setMaxPisteet(maxnumero)

}

  const Aanesta = () => {
    const copy = {...pisteet}
    copy[selected] += 1
    setPisteet(copy)
    console.log(copy)
    onkoIsoin(copy)
  }


  const randomNumero = () => {
    const anecLen = anecdotes.length;
    // Generoidaan random arvo seSelected:ille
    setSelected(Math.floor(Math.random() * anecLen));
  };

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
     <div>{anecdotes[selected]}</div> 
     <p>has {pisteet[selected]} votes</p>
     <button onClick={Aanesta}>Vote</button>
      <button onClick={randomNumero}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[maxpisteet]}</div>
    </div>
   
  )
}

export default App