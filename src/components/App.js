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
    const [editingCurrent, setCurrentEditing] = useState({});
    const [nextId, setNextId] = useState(getMaxId() + 1);
    const [sortBy, setSortBy] = useState(parseInt(getStorage('sortBy')));

    const isEmptyObject = (obj) => Object.keys(obj).length === 0;

    useEffect(() => {
        console.log(todos);
        setStorage('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        setStorage('sortBy', sortBy);
    });

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

    const editTask = (editedTaskName, editedPrio) => {
        const editedTodos = todos.map((todo) => {
            if (todo.id === editingCurrent.id) {
                todo.text = editedTaskName;
                todo.priority = parseInt(editedPrio);
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

    const addNewTodo = (newTodoName, newTodoPrio) => {
        closeNewPopup();
        const newItem = {
            id: nextId,
            text: newTodoName,
            priority: parseInt(newTodoPrio),
            completed: false
        };
        setNextId(newItem.id + 1);
        const newTodosArr = [...todos, newItem];
        setTodos(newTodosArr);
    };

    if (sortBy === 0) {
        todos.sort((a, b) => a.id - b.id);
    } else if (sortBy === 1) {
        todos.sort((a, b) => {
            const nameA = a.text.toUpperCase(); // ignore upper and lowercase
            const nameB = b.text.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    } else if (sortBy === 2) {
        todos.sort((a, b) => {
            const nameA = a.text.toUpperCase(); // ignore upper and lowercase
            const nameB = b.text.toUpperCase();
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            return 0;
        });
    } else if (sortBy === 3) {
        todos.sort((a, b) => b.completed - a.completed);
    } else if (sortBy === 4) {
        todos.sort((a, b) => a.completed - b.completed);
    } else if (sortBy === 5) {
        todos.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === 6) {
        todos.sort((a, b) => b.priority - a.priority);
    }

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
                {showPopup && <PopupNewTodo addNewTodo={addNewTodo} onClose={closeNewPopup} />}
                {!isEmptyObject(editingCurrent) && (
                    <PopupEditTodo onClose={closeEditPopup} editTask={editTask} passedTodo={editingCurrent} />
                )}
                <h2>TODO App</h2>

                <button className='btn-add' onClick={togglePopup}>
                    <i className='fa fa-plus'></i>
                </button>
            </div>
            <div className='todos-list'>{todosArr}</div>
            <div className='todos-bottom'>
                <select
                    className='sort-select'
                    value={sortBy}
                    onChange={(event) => setSortBy(parseInt(event.target.value))}>
                    <option value={0}>Alap rendezés</option>
                    <option value={1}>Szöveg szerint növ.</option>
                    <option value={2}>Szöveg szerint csökk.</option>
                    <option value={3}>Elvégzettség szerint növ.</option>
                    <option value={4}>Elvégzettség szerint csökk.</option>
                    <option value={5}>Fontosság szerint növ.</option>
                    <option value={6}>Fontosság szerint csökk.</option>
                </select>
            </div>
        </div>
    );
}

export default App;
