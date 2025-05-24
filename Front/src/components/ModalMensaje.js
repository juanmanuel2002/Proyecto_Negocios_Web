import React from 'react';
import '../styles/ModalMensaje.css';

const ModalMensaje = ({ titulo, mensaje, onClose, onConfirm,onCancel,confirmText,cancelText}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <div className="modal-actions">
          {onConfirm && (
            <button className="confirm-button" onClick={onConfirm}>
              {confirmText || 'Confirmar'}
            </button>
          )}
          <button className="close-modal"onClick={onCancel ? onCancel : onClose}>
            {onConfirm ? (cancelText || 'Cancelar') : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMensaje;