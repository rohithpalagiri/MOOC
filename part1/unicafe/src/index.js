import React, {useState} from 'react';
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <button onClick={props.handlClick}>{props.text}</button>
  )
}

const Display = (props) => {
  return(
    <div>{props.response}: {props.count}</div>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const addUp = () =>{
    return good + bad + neutral;
  }
  const calcAverage = () =>{
    return ((good-bad) / (good+bad+neutral))
  }
  const calcPositive = () =>{
    return ((good) / (good+bad+neutral))
  }

  if(addUp() === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
      <div>all: {addUp()}</div>
      <div>average: {calcAverage()} </div>
      <div>positive: {calcPositive()} </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () =>{
    setGood( good + 1)
  }

  const clickNeutral = () =>{
    setNeutral( neutral + 1)
  }

  const clickBad = () =>{
    setBad( bad + 1)
  }

  return (
    <div>
      <h1>give feeedback</h1>
      <Button handlClick={clickGood} text="good" />
      <Button handlClick={clickNeutral} text="neutral" />
      <Button handlClick={clickBad} text="bad" />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)