import React, { useState } from 'react';
import Popup from './Popup';

function PopupNewTodo(props) {
    const [taskName, setTaskName] = useState('');

    return (
        <Popup>
            <h1>Új feladat felvétele</h1>
            {/* 
                controlled input
                https://medium.com/madhash/two-way-binding-in-react-a-concise-what-why-and-how-guide-22e76d4551d5
            */}
            <input type='text' placeholder='Új tétel' onChange={setTaskName} />
            <button onClick={() => props.addNewTodo(taskName)}>Felvétel</button>
            <button onClick={props.onClose}>Bezárás</button>
        </Popup>
    );
}

export default PopupNewTodo;
