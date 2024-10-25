import { useState } from 'react';
import './mainshome.css';
import { IoIosCalculator } from "react-icons/io";




function MainsHome() {
  return (
    <>
   <div className='header_main' >
        <div className='cajita' >
          <div className='cajita_text' >
            <p>Hoy</p>
            <p>22 de octubre</p>
          </div>
          <div className='cajita_icon' >
            <IoIosCalculator />
          </div>

        </div>
        </div>
       

        
        

        

    </>
  );
}

export default MainsHome;
