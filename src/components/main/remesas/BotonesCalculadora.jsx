// Bibliotecas
import React from 'react';
// Componentes
import { BotonCalculadora } from "@components/main/remesas/BotonCalculadora";
// Data
import { Buttons } from '@data/buttons';


// Componente BotonesCalculadora
export const BotonesCalculadora = ({ onClick }) => {
  
  return (

    <>
      {Buttons.map(({ area, value, rotate, type }) => (
        <BotonCalculadora
          key={`${area}-${value}`}
          area={area}
          value={value}
          onClick={onClick}
          type={type}
          rotate={rotate}
        />
      ))}
    </>

  );
};

