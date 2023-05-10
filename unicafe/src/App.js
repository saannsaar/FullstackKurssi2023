import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = (props) => {

  if ( props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
   
     return (
      <table>
        <tbody>
        <tr>
          <td>
            <StatisticsLine text='good'/>
          </td>
          <td>
            <StatisticsLine value={props.good}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticsLine text='neutral'/>
          </td>
          <td>
            <StatisticsLine value={props.neutral}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticsLine text='bad'/>
          </td>
          <td>
            <StatisticsLine value={props.bad}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticsLine text='all'/>
          </td>
          <td>
            <StatisticsLine value={props.all}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticsLine text='average'/>
          </td>
          <td>
            <StatisticsLine value={props.average}/>
          </td>
        </tr>
        <tr>
          <td>
            <StatisticsLine text='positive'/>
          </td>
          <td>
            <StatisticsLine value={props.positive} text1='%'/>
          </td>
        </tr>
        </tbody>
      </table>
    )

  }

}

const StatisticsLine = (props) => {
  return (
    <div>
      {props.text} {props.value} {props.text1}
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setBad(bad +1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
