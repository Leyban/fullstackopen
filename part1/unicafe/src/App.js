import { useState } from 'react'


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return(
    <tbody>
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    </tbody>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  if(good===0 && neutral===0 && bad===0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  let total = good + neutral + bad;

  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={(good-bad)/total} />
      <StatisticLine text='positive' value={100*(good/total) + '%'} />
    </table>  
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <h1>statistics</h1>

      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App