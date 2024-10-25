import * as React from 'react';
import { X, Plus, Minus, Divide, Percent, Equal } from 'lucide-react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IoIosCalculator } from 'react-icons/io'; 

export default function RemittanceCalculatorPopup({ isOpen, onClose }) {
  const [display, setDisplay] = React.useState('');
  const [remittanceId, setRemittanceId] = React.useState('');
  const [remittances, setRemittances] = React.useState([
    { id: '12345678', amount: 100, status: 'NO_COBRADO' },
    { id: '87654321', amount: 200, status: 'COBRADO', collectedDate: '2023-06-15' },
  ]);
  
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');

  const handleToastClose = () => setToastOpen(false);

  
  const safeEval = (expression) => {
    try {
      return Function(`'use strict'; return (${expression})`)();
    } catch (error) {
      return 'Error';
    }
  };

  const handleNumberClick = (num) => {
    if (display.length < 10) {
      setDisplay(prev => prev + num);
    }
  };

  const handleOperatorClick = (operator) => {
    if (display && !isNaN(Number(display.slice(-1)))) {
      setDisplay(prev => prev + operator);
    }
  };

  const handleEqual = () => {
    const result = safeEval(display);
    setDisplay(result.toString());
  };

  const handleClear = () => {
    setDisplay('');
  };

  const validateRemittanceId = (id) => {
    return /^\d{1,8}$/.test(id);
  };

  const handleRemittanceSubmit = () => {
    if (!validateRemittanceId(remittanceId)) {
      setToastMessage("The ID must be up to 8 digits long.");
      setToastOpen(true);
      return;
    }

    const existingRemittance = remittances.find(r => r.id === remittanceId);
    if (existingRemittance) {
      if (existingRemittance.status === 'COBRADO') {
        setToastMessage(`This remittance was collected on ${existingRemittance.collectedDate}.`);
        setToastOpen(true);
      } else {
        const updatedRemittances = remittances.map(r =>
          r.id === remittanceId
            ? { ...r, status: 'COBRADO', collectedDate: new Date().toISOString().split('T')[0] }
            : r
        );
        setRemittances(updatedRemittances);
        setToastMessage(`Remittance ${remittanceId} has been marked as collected.`);
        setToastOpen(true);
      }
    } else {
      setToastMessage("The entered remittance ID does not exist in the system.");
      setToastOpen(true);
    }

    setRemittanceId('');
  };
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div>
      <div className="flex justify-end items-center p-2">
        <IoIosCalculator 
          className='text-3xl text-white p-1 rounded-full' 
          onClick={() => setIsOpen(true)} 
          aria-label="Open Remittance Calculator"
        />
      </div>

      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Remesas Calculadora</DialogTitle>
        <DialogContent> 
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="calculator-display">Calculator</label>
              <TextField
                id="calculator-display"
                value={display}
                readOnly
                variant="outlined"
                fullWidth
                className="text-right text-lg font-mono"
                aria-label="Calculator display"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                <Button key={num} onClick={() => handleNumberClick(num.toString())} 
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: 'gray' },
                  }}
                >
                  {num}
                </Button>
              ))}
              <Button onClick={() => handleOperatorClick('+')} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <Plus className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleOperatorClick('-')} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <Minus className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleOperatorClick('*')} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <X className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleOperatorClick('/')} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <Divide className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleOperatorClick('%')} sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <Percent className="h-4 w-4" />
              </Button>
              <Button onClick={handleEqual} className="col-span-2" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }} >
                <Equal className="h-4 w-4" />
              </Button>
              <Button onClick={handleClear} variant="contained" color="error">
                C
              </Button>
            </div>
            <div className="grid gap-2">
              <label htmlFor="remittance-id">Remesas ID</label>
              <TextField
                id="remittance-id"
                value={remittanceId}
                onChange={(e) => setRemittanceId(e.target.value)}
                maxLength={8}
                variant="outlined"
                fullWidth
                placeholder="Enter remittance ID"
                aria-label="Remittance ID input"
              />
              <Button onClick={handleRemittanceSubmit}>Submit Remittance</Button>
            </div>
            <div className="grid gap-2">
              <label>Remittance List</label>
              <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                {remittances.map((remittance) => (
                  <div key={remittance.id} className="flex justify-between items-center py-1">
                    <span>ID: {remittance.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${remittance.status === 'COBRADO' ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {remittance.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

     
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
