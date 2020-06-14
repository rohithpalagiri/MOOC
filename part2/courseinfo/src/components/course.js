import React from 'react';

const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }

  const Part = (props) => {
    return (
      
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map( (x) => <Part key={x.id} name={x.name} exercises={x.exercises} /> )}
      </div>
    )
  }

  const Total = ({ parts }) => {
    return(
      <p><b>total of {parts.reduce( (a, x) => { return a + x.exercises }, 0)}</b></p>
    ) 
  }

const Course = ({ course }) => {
    return (
      <div>
        {course.map((x) =>{
            return (
                <div>
                    <Header key={x.id} name={x.name} />
                    <Content key={x.parts.id} parts={x.parts} />
                    <Total key={x.parts.id} parts={x.parts} />
                </div>
            )

        })}
      </div>
    )
  }

  export default Course