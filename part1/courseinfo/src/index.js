import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const History = ({allClicks}) => {

  if(allClicks.length === 0){
    return(
      <div>This app is used to log all clicks</div>
    )
  }
  return(
    <div>
      {allClicks.join(' ')}
    </div>
  )
}

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}


const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="left" />
        {right}
        <History allClicks={allClicks}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))