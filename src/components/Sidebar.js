
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog,faJetFighter,faReceipt,faMusic } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="\logo.png"/>
      </div>
      <ul>
        <li><FontAwesomeIcon icon={faHome} /></li>
        <li><FontAwesomeIcon icon={faUser} /></li>
        <li><FontAwesomeIcon icon={faCog} /></li>
        <li><FontAwesomeIcon icon={faJetFighter} /></li>
        <li><FontAwesomeIcon icon={faReceipt} /></li>
        <li><FontAwesomeIcon icon={faMusic} /></li>
      </ul>
    </div>
  );
};

export default Sidebar;
