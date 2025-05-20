import React, { useState } from 'react';

const DireccionForm = ({ initialDireccion = {}, onSave }) => {
  const [direccion, setDireccion] = useState({
    codigoPostal: initialDireccion.codigoPostal || '',
    calle: initialDireccion.calle || '',
    numeroInterior: initialDireccion.numeroInterior || '',
    numeroExterior: initialDireccion.numeroExterior || '',
    colonia: initialDireccion.colonia || '',
    delegacion: initialDireccion.delegacion || '',
    pais: initialDireccion.pais || '',
  });

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(direccion);
  };

  return (
    <form onSubmit={handleSubmit} className="direccion-form">
      <input name="codigoPostal" placeholder="Código Postal" value={direccion.codigoPostal} onChange={handleChange} required />
      <input name="calle" placeholder="Calle" value={direccion.calle} onChange={handleChange} required />
      <input name="numeroInterior" placeholder="Número Interior" value={direccion.numeroInterior} onChange={handleChange} />
      <input name="numeroExterior" placeholder="Número Exterior" value={direccion.numeroExterior} onChange={handleChange} required />
      <input name="colonia" placeholder="Colonia" value={direccion.colonia} onChange={handleChange} required />
      <input name="delegacion" placeholder="Delegación" value={direccion.delegacion} onChange={handleChange} required />
      <input name="pais" placeholder="País" value={direccion.pais} onChange={handleChange} required />
      <button type="submit">Guardar dirección</button>
    </form>
  );
};

export default DireccionForm;