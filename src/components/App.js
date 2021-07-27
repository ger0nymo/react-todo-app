import todosData from '../todosData';
import TodoFunctions from './TodoFunctions';
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Popup from './Popup';
import PopupNewTodo from './PopupNewTodo';
import PopupEditTodo from './PopupEditTodo';
import { setStorage, getStorage } from '../utils/StorageFunctions';

const _INIT_TODOS = JSON.parse(getStorage('todos'));
const getMaxId = () => {
    if (!_INIT_TODOS || _INIT_TODOS.length === 0) return 0;
    //Visszatér a legnagyobb idval
    const ids = _INIT_TODOS.map((todo) => todo.id);
    ids.sort((a, b) => b - a);
    return ids[0];
};
function App() {
    const [todos, setTodos] = useState(_INIT_TODOS || []);
    const [showPopup, setPopup] = useState(false);
    // const [showEditPopup, setEditPopup] = useState(false); // null, '1', '2,
    const [editingCurrent, setCurrentEditing] = useState({});
    const [nextId, setNextId] = useState(getMaxId() + 1);

    const isEmptyObject = (obj) => Object.keys(obj).length === 0;

    // const [showPopup, setPopup] = useState(); // NULL, 'ADD', 'EDIT'

    useEffect(() => {
        console.log(todos);
        setStorage('todos', JSON.stringify(todos));
    }, [todos]);

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
        setStorage('todos', editedTodos);
    };

    const removeTask = (taskId) => {
        console.log('Removing ', taskId);
        const newTodos = todos.filter((todo) => todo.id !== taskId);
        setTodos(newTodos);
    };

    const togglePopup = () => {
        setPopup(!showPopup);
    };

    const closeNewPopup = () => setPopup(false);

    const closeEditPopup = () => setCurrentEditing({});

    const addNewTodo = (newTodoName) => {
        closeNewPopup();
        const newItem = {
            id: nextId,
            text: newTodoName,
            completed: false
        };
        setNextId(newItem.id + 1);
        const newTodosArr = [...todos, newItem];
        setTodos(newTodosArr);
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
