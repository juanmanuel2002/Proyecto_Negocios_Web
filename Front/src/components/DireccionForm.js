import React, { useState, useEffect } from 'react';
import '../styles/DireccionForm.css'; 

const DireccionForm = ({ initialDireccion = {}, onSave }) => {
  const [direccion, setDireccion] = useState({
    codigoPostal: initialDireccion.codigoPostal || '',
    calle: initialDireccion.calle || '',
    numeroInterior: initialDireccion.numeroInterior || '',
    numeroExterior: initialDireccion.numeroExterior || '',
    colonia: initialDireccion.colonia || '',
    delegacion: initialDireccion.delegacion || '',
    pais: initialDireccion.pais || '',
    ciudad: initialDireccion.ciudad || '',
    estado: initialDireccion.estado || '',
  });

  const [colonias, setColonias] = useState([]);

  useEffect(() => {
    if (direccion.codigoPostal.length === 5) {
      fetch(`https://sepomex.icalialabs.com/api/v1/zip_codes?zip_code=${direccion.codigoPostal}`)
        .then(res => res.json())
        .then(data => {
          if (data.zip_codes && data.zip_codes.length > 0) {
            const colonias = data.zip_codes.map(z => z.d_asenta);
            const info = data.zip_codes[0];
            setColonias(colonias);
            setDireccion(prev => ({
              ...prev,
              colonia: colonias[0] || '',
              ciudad: info.d_ciudad || '',
              estado: info.d_estado || '',
              pais: 'México'
            }));
          } else {
            setColonias([]);
          }
        })
        .catch(() => setColonias([]));
    }
  }, [direccion.codigoPostal]);

  const handleChange = (e) => {
    setDireccion({ ...direccion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(direccion);
  };

  return (
    <form onSubmit={handleSubmit} className="direccion-form">
      <h2>Agrega tu dirección de envío</h2>
      <label>
        Código Postal
        <input
          name="codigoPostal"
          placeholder="Código Postal"
          value={direccion.codigoPostal}
          onChange={handleChange}
          required
          maxLength={5}
        />
      </label>
      <label>
        Ciudad
        <input name="ciudad" placeholder="Ciudad" value={direccion.ciudad || ''} onChange={handleChange} required />
      </label>
      <label>
        Estado
        <input name="estado" placeholder="Estado" value={direccion.estado || ''} onChange={handleChange} required />
      </label>
      <label>
        Colonia  <select name="colonia" value={direccion.colonia} onChange={handleChange} required>
            {colonias.map((col, idx) => (
              <option key={idx} value={col}>{col}</option>
            ))}
          </select>
      </label>
      <label>
        Delegación
        <input name="delegacion" placeholder="Delegación" value={direccion.delegacion} onChange={handleChange} required />
      </label>
      <label>
        Calle
        <input name="calle" placeholder="Calle" value={direccion.calle} onChange={handleChange} required />
      </label>
      <label>
        Número Exterior
        <input name="numeroExterior" placeholder="Número Exterior" value={direccion.numeroExterior} onChange={handleChange} required />
      </label>
      <label>
        Número Interior
        <input name="numeroInterior" placeholder="Número Interior" value={direccion.numeroInterior} onChange={handleChange} />
      </label>
      
            
     
      
      <button type="submit">Guardar dirección</button>
    </form>
  );
};

export default DireccionForm;