import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './CalculatorPopup.css';

export default function RemittanceCalculatorPopup({ isOpen, onClose, addNotification }) {
    const [display, setDisplay] = useState('');
    const [remittanceId, setRemittanceId] = useState('');
    const [remittances, setRemittances] = useState([
        { id: '12345678', amount: 100, status: 'NO_COBRADO' },
        { id: '87654321', amount: 200, status: 'COBRADO', collectedDate: '2023-06-15' },
    ]);

    const handleCalculate = () => {
        try {
            // Aquí podrías realizar cálculos relacionados si es necesario
            // Por ahora, solo llamamos a la notificación y cerramos la ventana
            addNotification('good'); // Notificación de éxito
            onClose();
        } catch (error) {
            addNotification('bad'); // Notificación de error
        }
    };

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

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
            setDisplay((prev) => prev + num);
        }
    };

    const handleOperatorClick = (operator) => {
        if (display && !isNaN(Number(display.slice(-1)))) {
            setDisplay((prev) => prev + operator);
        }
    };

    const handleEqual = () => {
        const result = safeEval(display);
        setDisplay(result.toString());
        addNotification('good'); // Notificación de éxito al calcular
    };

    const handleClear = () => {
        setDisplay('');
    };

    const validateRemittanceId = (id) => /^\d{1,8}$/.test(id);

    const handleRemittanceSubmit = () => {
        if (!validateRemittanceId(remittanceId)) {
            setToastMessage("El ID debe tener hasta 8 dígitos.");
            setToastOpen(true);
            addNotification('bad'); // Notificación de error
            return;
        }

        const existingRemittance = remittances.find(r => r.id === remittanceId);
        if (existingRemittance) {
            if (existingRemittance.status === 'COBRADO') {
                setToastMessage(`Esta remesa fue cobrada el ${existingRemittance.collectedDate}.`);
                setToastOpen(true);
                addNotification('bad'); // Notificación de error
            } else {
                const updatedRemittances = remittances.map(r =>
                    r.id === remittanceId
                        ? { ...r, status: 'COBRADO', collectedDate: new Date().toISOString().split('T')[0] }
                        : r
                );
                setRemittances(updatedRemittances);
                setToastMessage(`La remesa ${remittanceId} ha sido marcada como cobrada.`);
                setToastOpen(true);
                addNotification('good'); // Notificación de éxito
            }
        } else {
            setToastMessage("El ID de remesa ingresado no existe en el sistema.");
            setToastOpen(true);
            addNotification('bad'); // Notificación de error
        }

        setRemittanceId('');
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete') {
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="calculator-popup">
            {isOpen && (
                <div className="dialog">
                    <div className="dialog-header">
                        <h2>Ventana Digital</h2>
                        <button className="close-button" onClick={onClose}><X /></button>
                    </div>
                    <div className="dialog-content">
                        <div className="calculator-display">
                            <label htmlFor="calculator-display">Remesas</label>
                            <input id="calculator-display" value={display} readOnly className="display" />
                        </div>
                        <div className="button-grid">
                            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                                <button key={num} onClick={() => handleNumberClick(num.toString())} className="number-button">
                                    {num}
                                </button>
                            ))}
                            <button onClick={() => handleOperatorClick('+')} className="operator-button">+</button>
                            <button onClick={() => handleOperatorClick('-')} className="operator-button">-</button>
                            <button onClick={() => handleOperatorClick('*')} className="operator-button">×</button>
                            <button onClick={() => handleOperatorClick('/')} className="operator-button">÷</button>
                            <button onClick={() => handleOperatorClick('%')} className="operator-button">%</button>
                            <button onClick={handleEqual} className="equal-button">=</button>
                            <button onClick={handleClear} className="clear-button">C</button>
                        </div>
                        <div className="remittance-section">
                            <label htmlFor="remittance-id">ID de Remesa</label>
                            <input
                                id="remittance-id"
                                value={remittanceId}
                                onChange={(e) => setRemittanceId(e.target.value)}
                                placeholder="Ingrese ID de remesa"
                                className="remittance-input"
                            />
                            <button onClick={handleRemittanceSubmit} className="submit-button">Enviar Remesa</button>
                        </div>
                        <div className="remittance-list">
                            <label>Lista de Remesas</label>
                            <div className="remittance-container">
                                {remittances.map((remittance) => (
                                    <div key={remittance.id} className="remittance-item">
                                        <span>ID: {remittance.id}</span>
                                        <span className={`status ${remittance.status === 'COBRADO' ? 'collected' : 'pending'}`}>
                                            {remittance.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toastOpen && (
                <div className="toast">
                    <span>{toastMessage}</span>
                    <button onClick={handleToastClose} className="toast-close">X</button>
                </div>
            )}
        </div>
    );
}
