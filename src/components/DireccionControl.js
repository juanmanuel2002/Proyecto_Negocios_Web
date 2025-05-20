import React, { useEffect, useState } from 'react';
import DireccionForm from './DireccionForm';
import ModalMensaje from './ModalMensaje';
import { fetchUserInfo, updateUserDireccion } from '../services/api';
import '../styles/DireccionControl.css'; 

const DireccionControl = ({ userId, onDireccionConfirmada }) => {
  const [direccion, setDireccion] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  useEffect(() => {
    const getDireccion = async () => {
      const res = await fetchUserInfo(userId);
      const dir = res.data?.direccion;
      if (
        !dir ||
        !dir.calle ||
        !dir.codigoPostal ||
        !dir.colonia ||
        !dir.delegacion ||
        !dir.pais ||
        !dir.numeroExterior
      ) {
        setShowForm(true);
        setShowConfirmModal(false);
        setDireccion(dir || {});
      } else {
        setDireccion(dir);
        setShowForm(false);
        setShowConfirmModal(true);
      }
    };
    getDireccion();
  }, [userId]);

  const handleConfirmDireccion = () => {
    setShowConfirmModal(false);
    onDireccionConfirmada(direccion);
  };

  const handleEditDireccion = () => {
    setShowConfirmModal(false);
    setShowForm(true);
    setFormKey(Date.now()); 
  };


  const handleSaveDireccion = async (nuevaDireccion) => {
    const res = await updateUserDireccion(userId, nuevaDireccion);
    if (res.success) {
      setDireccion(nuevaDireccion);
      setShowForm(false);
      setShowConfirmModal(true); // Vuelve a mostrar el modal de confirmación con la nueva dirección
    } else {
      alert('Error al guardar la dirección');
    }
  };

  return (
    <>
      {showForm && (
        <div className="direccion-modal-overlay">
          <div className="direccion-modal-content">
            <DireccionForm
              key={formKey}
              initialDireccion={direccion || {}}
              onSave={handleSaveDireccion}
            />
          </div>
        </div>
      )}
      {showConfirmModal && (
        <ModalMensaje
          titulo="¿Usar esta dirección de entrega?"
          mensaje={
            <div>
              <p>
                {direccion.calle} #{direccion.numeroExterior}{' '}
                {direccion.numeroInterior && `Int. ${direccion.numeroInterior}`}
              </p>
              <p>
                {direccion.colonia}, {direccion.delegacion}, {direccion.pais}, CP {direccion.codigoPostal}
              </p>
            </div>
          }
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDireccion}
          onCancel={handleEditDireccion}
          confirmText="Usar esta dirección"
          cancelText="Editar dirección"
        />
      )}
    </>
  );
};

export default DireccionControl;