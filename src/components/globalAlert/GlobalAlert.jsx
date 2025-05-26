import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GlobalAlert = ({ show, onClose, title = 'Alerta', message = '', type = 'danger' }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className={`bg-${type} text-white`}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={type} onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GlobalAlert;