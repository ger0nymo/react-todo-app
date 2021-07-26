import React from 'react';

function Popup(props) {
    return (
        <div className='popup'>
            <div className='popup-inner'>
                {/* {props.onClose && <button onClick={props.onClose}>X</button>} */}
                {props.children}
            </div>
        </div>
    );
}

export default Popup;
