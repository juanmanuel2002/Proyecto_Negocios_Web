import React from 'react';

const MysteryBoxCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="card-box">
            <Icon size={30} color="#6d4c41" />
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
};

export default MysteryBoxCard;