// Bibliotecas
import React from 'react';


// Componente PantallaCalculadora
export const PantallaCalculadora = ({ value, onChange }) => {

  return (

    <div className={`relative`} style={{ gridArea: 'input' }}>

      {/* <span className={`absolute left-4 top-4 text-2xl font-normal text-mine-shaft-950`}>|⁕⁕</span> */}

      <input id="inputCalculator" name="inputCalculator" type="text" autoComplete='off' className={`block w-full text-xl text-center border-none outline-none rounded-xl py-4 bg-white-50 text-mine-shaft-950 md:text-2xl`} placeholder="|⁕⁕" value={value} onChange={onChange} />

    </div>

  );
};
