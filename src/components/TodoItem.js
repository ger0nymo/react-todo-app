import React from 'react'
import '../style.css'

function TodoItem(props) {
  return (
    <div className='todo'>
      <input
        type='checkbox'
        checked={props.task.completed}
        onChange={() => props.handleChange(props.task.id)}
      />
      <p>{props.task.text}</p>
      <button onClick={() => props.editTask(props.task.id)}>Szerk.</button>
    </div>
  )
}

export default TodoItem
