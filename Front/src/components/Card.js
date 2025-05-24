import React from 'react';

const Card = ({ titulo, descripcion, imagen }) => {
  return (
    <div className="card">
      {imagen && <img src={imagen} alt={titulo} className="card-image" />}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
};

export default Card;