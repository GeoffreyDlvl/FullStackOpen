import React, { useState } from 'react'

const Title = ({ title }) =>
  <h1>{title}</h1>

const Anecdote = ({ anecdoteText }) =>
  <div>{anecdoteText}</div>

const Score = ({ score }) =>
  <div>has {score} votes</div>

const Button = ({ clickHandler, text }) =>
  <button onClick={clickHandler}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log(points)

  const updateSelectedAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const addPoint = () => {
    const copy = [...points]
    copy[selected] += 1;
    setPoints(copy);
  }

  return (
    <div>
      <Title title="Anecdote of the day" />
      <Anecdote anecdoteText={anecdotes[selected]} />
      <Score score={points[selected]} />
      <Button clickHandler={addPoint} text="vote" />
      <Button clickHandler={updateSelectedAnecdote} text="next anecdote" />
      <Title title="Anecdote with most votes" />
      <Anecdote anecdoteText={anecdotes[points.indexOf(Math.max(...points))]} />
      <Score score={points[points.indexOf(Math.max(...points))]} />
    </div>
  )
}

export default App