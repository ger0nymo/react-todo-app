import React, { useState } from 'react';
import Popup from './Popup';

function PopupNewTodo(props) {
    const [taskName, setTaskName] = useState('');

    return (
        <Popup>
            <h1>Új feladat felvétele</h1>
            <input
                type='text'
                placeholder='Új tétel'
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
            />
            <button className='add-item-button' onClick={() => props.addNewTodo(taskName)}>
                Felvétel
            </button>
            <button className='close-button' onClick={props.onClose}>
                Bezárás
            </button>
        </Popup>
    );
}

export default PopupNewTodo;
