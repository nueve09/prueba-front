// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import DataDisplay from './components/DataDisplay';
import './App.css'; 

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <div className="horizontal-container">
          <Calculator />
          <DataDisplay />
        </div>
      </div>
    </div>
  );
};

export default App;
