import React from 'react';
import './style.css'

export default function ErrorDiv() {


    function closeWindow(){
        document.querySelector('.error-div').style.display="none"
    }

  return <div className='error-div'>
      <h3>El número telefónico que ingresó ya está registrado</h3>
      <h5>Intenta ingresar otro número</h5>
      <button onClick={closeWindow}>Volver a intentar</button>
  </div>;
}
