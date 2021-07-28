import React, { useState } from 'react';
import Popup from './Popup';

function PopupEditTodo(props) {
    const [taskName, setTaskName] = useState(props.passedTodo.text);
    return (
        <Popup>
            <h1>Feladat szerkesztése</h1>
            <input
                type='text'
                placeholder='Új tétel'
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
            />
            <button className='add-item-button' onClick={() => props.editTask(taskName)}>
                Szerkesztés
            </button>
            <button className='close-button' onClick={props.onClose}>
                Bezárás
            </button>
        </Popup>
    );
}

export default PopupEditTodo;
