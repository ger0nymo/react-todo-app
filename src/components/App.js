import React from 'react'
import TodoItem from './TodoItem'
import todosData from '../todosData'

const App = () => {
  const todosArray = todosData.map((item) => {
    return <TodoItem key={item.id} task={item} />
  })
  console.log(todosArray)
  return <div className='todos-list'>{todosArray}</div>
}

export default App
