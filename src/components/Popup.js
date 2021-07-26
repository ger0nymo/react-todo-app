import React from 'react'

function Popup(props) {
  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h1>Új feladat felvétele</h1>
        <input type='text' placeholder='Új tétel' />
        <button onClick={props.togglePopup}>Felvétel</button>
        <button onClick={props.togglePopup}>Bezárás</button>
      </div>
    </div>
  )
}

export default Popup
