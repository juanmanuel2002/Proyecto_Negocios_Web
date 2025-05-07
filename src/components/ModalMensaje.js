import React from 'react';
import '../styles/ModalMensaje.css';

const ModalMensaje = ({ titulo, mensaje, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalMensaje;