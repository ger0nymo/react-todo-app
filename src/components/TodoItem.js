import React from 'react'
import '../style.css'

const TodoItem = (props) => {
  return (
    <div className='todo-parent'>
      <div className='todo'>
        <input type='checkbox' checked={props.task.completed} />
        <p>{props.task.text}</p>
      </div>
    </div>
  )
}

export default TodoItem
