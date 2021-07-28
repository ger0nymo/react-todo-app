import React, { useState } from 'react';
import Popup from './Popup';

function PopupEditTodo(props) {
    const [taskName, setTaskName] = useState(props.passedTodo.text);
    const [priority, setPriority] = useState(props.passedTodo.priority);
    return (
        <Popup>
            <h1>Feladat szerkesztése</h1>
            <input
                type='text'
                placeholder='Új tétel'
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
            />
            <div className='popup-bottom'>
                <button className='add-item-button' onClick={() => props.editTask(taskName, priority)}>
                    Szerkesztés
                </button>
                <button className='close-button' onClick={props.onClose}>
                    Bezárás
                </button>
            </div>
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value={1} className='prio-1'>
                    Nem fontos
                </option>
                <option value={2} className='prio-2'>
                    Közepesen fontos
                </option>
                <option value={3} className='prio-3'>
                    Fontos
                </option>
            </select>
        </Popup>
    );
}

export default PopupEditTodo;
