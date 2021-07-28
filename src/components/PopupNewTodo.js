import React, { useState } from 'react';
import Popup from './Popup';

function PopupNewTodo(props) {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState(1);

    return (
        <Popup>
            <h1>Új feladat felvétele</h1>
            <input
                type='text'
                placeholder='Új tétel'
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
            />
            <div className='popup-bottom'>
                <button className='add-item-button' onClick={() => props.addNewTodo(taskName, priority)}>
                    Felvétel
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

export default PopupNewTodo;
