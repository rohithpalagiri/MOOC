import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const randomQuote = () =>{
    let max = props.anecdotes.length - 1;
    const newSelect = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    console.log("this is new select", newSelect)
    return setSelected(newSelect);
  }

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    return setVotes(newVotes);
  }

  const maxVotes = () => {

    var index = votes.indexOf(Math.max(...votes));

    console.log("max value is", index);

    return props.anecdotes[index]
  }

  return (
    <div>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={randomQuote}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>

      <div>{maxVotes()}</div>


    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)