import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Perfil.css';

const Perfil = () => {
  const { currentUser } = useAuth(); // Obtener el usuario autenticado

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="perfil-container">
          <h1>Mi Perfil</h1>
          {currentUser ? (
            <div className="perfil-info">
              <p><strong>Nombre:</strong> {currentUser.name}</p>
              <p><strong>Correo Electrónico:</strong> {currentUser.email || 'No disponible'}</p>
              <p><strong>Suscripción:</strong> {currentUser.suscripcion || 'No cuentas con una suscripción'}</p>
            </div>
          ) : (
            <p>No se encontró información del usuario. Por favor, inicia sesión.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Perfil;