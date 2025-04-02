import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

const Main = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user') || 'Usuario';

    return (
        <div className="main-container">
            <h1 className="title">🍽️ Sabores Ocultos</h1>
            <p className="subtitle">Descubre los mejores platillos secretos.</p>
            
            <div className="user-info">
                <p>Bienvenido, <strong>{user}</strong></p>
                <button className="logout-button" onClick={() => { 
                    localStorage.removeItem('token');
                    navigate('/login');
                }}>Cerrar sesión</button>
            </div>

            <div className="image-container">
                <img src="https://source.unsplash.com/800x500/?food" alt="Comida deliciosa" />
            </div>
        </div>
    );
};

export default Main;
