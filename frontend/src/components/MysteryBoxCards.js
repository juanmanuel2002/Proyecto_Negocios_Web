import React from 'react';

const MysteryBoxCard = ({ icon: Icon, title, description, onClick }) => {
    return (
      <div className="mystery-box-card" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="icon-container">
          <Icon className="card-icon" />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };

export default MysteryBoxCard;