import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const Stat = ({ name, number }) => (
  <p>{name} {number}</p>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />

      <h1>statistics</h1>
      <Stat name='good' number={good} />
      <Stat name='neutral' number={neutral} />
      <Stat name='bad' number={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
