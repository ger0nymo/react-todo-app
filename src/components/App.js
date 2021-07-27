import todosData from '../todosData';
import TodoFunctions from './TodoFunctions';
import React, { useState } from 'react';
import TodoItem from './TodoItem';
import Popup from './Popup';
import PopupNewTodo from './PopupNewTodo';
import PopupEditTodo from './PopupEditTodo';

function App() {
    const [todos, setTodos] = useState(todosData);
    const [showPopup, setPopup] = useState(false);
    // const [showEditPopup, setEditPopup] = useState(false); // null, '1', '2,
    const [editingCurrent, setCurrentEditing] = useState({});

    const isEmptyObject = (obj) => Object.keys(obj).length === 0;

    // const [showPopup, setPopup] = useState(); // NULL, 'ADD', 'EDIT'

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

    const editTask = (editedTaskName) => {
        const editedTodos = todos.map((todo) => {
            if (todo.id === editingCurrent.id) {
                todo.text = editedTaskName;
            }
            return todo;
        });
        setTodos(editedTodos);
        closeEditPopup();
    };

    const removeTask = (taskId) => {
        console.log('Removing ', taskId);
        const newTodos = todos.filter((todo) => todo.id !== taskId);
        setTodos(
            newTodos.map((newTodo) => {
                if (newTodo.id >= taskId) {
                    newTodo.id--;
                }
                return newTodo;
            })
        );
    };

    const togglePopup = () => {
        setPopup(!showPopup);
    };

    const closeNewPopup = () => setPopup(false);

    const closeEditPopup = () => setCurrentEditing({});

    const addNewTodo = (newTodoName) => {
        closeNewPopup();
        const newItem = {
            id: todos.length + 1,
            text: newTodoName,
            completed: false
        };
        todos.push(newItem);
    };

    const todosArr = todos.map((todo) => {
        return (
            <TodoItem
                key={todo.id}
                task={todo}
                handleChange={handleChange}
                editTask={editTask}
                removeTask={() => removeTask(todo.id)}
                editFunction={() => setCurrentEditing(todo)}
            />
        );
    });

    // You don't know JS (https://github.com/getify/You-Dont-Know-JS)

    return (
        <div className='todos-container'>
            <div className='todos-header'>
                {/* {showPopup ? <Popup togglePopup={togglePopup} /> : null} */}
                {showPopup && <PopupNewTodo addNewTodo={addNewTodo} onClose={closeNewPopup} />}
                {!isEmptyObject(editingCurrent) && (
                    <PopupEditTodo onClose={closeEditPopup} editTask={editTask} passedTodo={editingCurrent} />
                )}
                <button onClick={togglePopup}>Új hozzáadása</button>
            </div>
            <div className='todos-list'>{todosArr}</div>
        </div>
    );
}

export default App;
