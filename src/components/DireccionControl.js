import React, { useEffect, useState } from 'react';
import DireccionForm from './DireccionForm';
import ModalMensaje from './ModalMensaje';
import '../styles/DireccionControl.css'; // Asegúrate de tener este archivo CSS
import { fetchUserInfo, updateUserDireccion } from '../services/api';

const DireccionControl = ({ userId, onDireccionConfirmada }) => {
  const [direccion, setDireccion] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const getDireccion = async () => {
      const res = await fetchUserInfo(userId);
      const dir = res.data?.direccion;
      // Si no hay dirección o le falta algún campo importante, muestra el formulario
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
      } else {
        setDireccion(dir);
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
    setShowConfirmModal(true);
    setShowForm(false);
  };

  const handleSaveDireccion = async (nuevaDireccion) => {
    const res = await updateUserDireccion(userId, nuevaDireccion);
    if (res.success) {
      setDireccion(nuevaDireccion);
      setShowForm(false);
      onDireccionConfirmada(nuevaDireccion);
    } else {
      alert('Error al guardar la dirección');
    }
  };

  return (
    <>
      {showForm && (
      <div className="direccion-modal-overlay">
        <div className="direccion-modal-content">
          <DireccionForm initialDireccion={direccion || {}} onSave={handleSaveDireccion} />
        </div>
      </div>
      )}
      {showConfirmModal && (
        <ModalMensaje
          titulo="¿Usar esta dirección de entrega?"
          mensaje={
            <div>
              <p>{direccion.calle} #{direccion.numeroExterior} {direccion.numeroInterior && `Int. ${direccion.numeroInterior}`}</p>
              <p>{direccion.colonia}, {direccion.delegacion}, {direccion.pais}, CP {direccion.codigoPostal}</p>
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