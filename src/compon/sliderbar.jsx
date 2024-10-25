import { useState, createContext, useContext } from 'react';
import { FaHome, FaInfoCircle, FaCog, FaFolder, FaEnvelope } from 'react-icons/fa';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoIosCalculator } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Table from './Table';
import CalculatorPopup from './CalculatorPopup';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import './sliderbar.css';
import { useError } from './ErrorProvider'; 



function Sliderbar() {
  const { triggerError } = useError(); 
  const [open, setOpen] = useState(true);
  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  const showSuccessAlert = () => {
    toast.success("¡Operación realizada con éxito!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const showErrorAlert = () => {
    triggerError("Hubo un error en la operación"); 
  };

  const showConfirmationAlert = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        showSuccessAlert();
      } else {
        showErrorAlert(); 
      }
    });
  };

  const handleOpenUserMenu = (event) => {
 
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  const navItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    { name: "About", icon: <FaInfoCircle />, link: "/about" },
    { name: "Services", icon: <FaCog />, link: "/services" },
    { name: "Portfolio", icon: <FaFolder />, link: "/portfolio" },
    { name: "Contact", icon: <FaEnvelope />, link: "/contact" },
  ];

  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        <div className='flex'>
          <div className={`bg-black p-5 pt-8 ${open ? "w-[100px]" : "w-72"} relative h-full overflow-hidden`}>
            <IoIosArrowForward className='bg-white text-indigo-600 text-3xl rounded-full absolute top-0 right-0 border-blue-500 cursor-pointer' onClick={() => setOpen(!open)} />
            <div className="p-4 pb-2 flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-white bg-black rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary-foreground"
                  >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                </div>
                <span className={`text-lg font-bold text-white ml-2 ${open && "scale-0"}`}>BrandName</span>
              </div>
            </div>
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="flex items-center px-4 py-3 text-white hover:bg-gray-100 hover:text-gray-900 rounded-lg"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className={`${open && "scale-0"}`}>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`ml-${open ? '100' : '72'} flex-1 p-4 h-full`}>
          <main className='bg-white h-full overflow-hidden'>
            <div className='flex justify-between'>
              <div className='w-1/2 flex justify-end'>
                {}
              </div>
              <div className='w-1/2 justify-end p-2 login'>
                <Badge badgeContent={0} color="error">
                  <IoMdNotificationsOutline className="text-2xl text-black cursor-pointer" />
                </Badge>
                <div className='w-1/2 flex justify-end'>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    className="p-0 cursor-pointer text-2xl" 
                    sx={{ 
                      p: 0,
                      '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' }
                    }} 
                  >
                    <Avatar alt="R" className="w-2 h-2" /> 
                  </IconButton>
                  <div className='flex items-start flex-col justify-center p-4'>
                    <p className='block font-semibold text-xl text-right'>Saul Arroyo</p>
                    <p className='block font-normal text-base text-right'>Operador</p>
                  </div>
                  <div className='flechita'>
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="w-1/2"> 
                <p className='font-semibold text-indigo-500 text-2xl'>Hoy</p>
                <p className='font-semibold text-base'>22 de octubre del 2024</p>
              </div>
              <div className='w-1/2'>
                <div className="flex justify-end items-center p-2">
                  <IoIosCalculator
                    className='bg-indigo-600 text-white p-1 rounded-md cursor-pointer text-3xl'
                    onClick={() => setCalculatorOpen(true)} 
                  />
                  <CalculatorPopup isOpen={isCalculatorOpen} onClose={() => setCalculatorOpen(false)} />
                  <FiPrinter className='text-3xl text-white bg-indigo-600 p-1 rounded-md m-2 cursor-pointer'
                   onClick={() => showConfirmationAlert()} 
                  />
                </div>
              </div> 
            </div>

            <div className="mt-4">
              <Table searchQuery={searchQuery} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Sliderbar;
