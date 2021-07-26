import todosData from '../todosData';
import TodoFunctions from './TodoFunctions';
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import Popup from './Popup';
import PopupNewTodo from './PopupNewTodo';

function App() {
    const [todos, setTodos] = useState(todosData);
    const [showPopup, setPopup] = useState(false);

    const handleChange = (id) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
            return newTodos;
        });
    };

    const editTask = (id) => {
        console.log('Editing ', id);
    };

    const togglePopup = () => {
        setPopup(!showPopup);
    };

    const addNewTodo = (e) => {
        if (e.target) {
            setPopup(!showPopup);
            const newItem = {
                id: todos.length + 1,
                text: e.target.value,
                completed: false
            };
            todos.push(newItem);
            console.log(e.target.value);
        }
    };

    const todosArr = todos.map((todo) => {
        return <TodoItem key={todo.id} task={todo} handleChange={handleChange} editTask={editTask} />;
    });

    // You don't know JS (https://github.com/getify/You-Dont-Know-JS)

    return (
        <div className='todos-container'>
            <div className='todos-header'>
                {/* {showPopup ? <Popup togglePopup={togglePopup} /> : null} */}
                {showPopup && <PopupNewTodo addNewTodo={addNewTodo} onClose={() => setPopup(false)} />}
                <button onClick={togglePopup}>Új hozzáadása</button>
            </div>
            <div className='todos-list'>{todosArr}</div>
        </div>
    );
}

export default App;
