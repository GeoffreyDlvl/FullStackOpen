import React, { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ feedbackValues }) => {
  const { good, neutral, bad } = feedbackValues
  const total = good + neutral + bad;
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  const averageScore = (good - bad) / (good + neutral + bad)
  const positiveScore = (good) / (good + neutral + bad)
  const positiveScorePercentage = (positiveScore * 100) + ' %'
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={averageScore} />
        <StatisticsLine text="positive" value={positiveScorePercentage} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={incrementGood} text="good" />
      <Button handleClick={incrementNeutral} text="neutral" />
      <Button handleClick={incrementBad} text="bad" />
      <Title text="statistics" />
      <Statistics feedbackValues={{ good, neutral, bad }} />
    </div>
  )
}

export default App