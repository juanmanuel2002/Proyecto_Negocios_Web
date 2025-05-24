import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Perfil.css';

const Perfil = () => {
  const { currentUser } = useAuth(); // Obtener el usuario autenticado

  // Función para capitalizar la primera letra de cada palabra
  const capitalizeName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="perfil-container">
          <h1>Mi Perfil</h1>
          {currentUser ? (
            <div className="perfil-info">
              <p><strong>Nombre:</strong> {capitalizeName(currentUser.name || currentUser.nombre)}</p>
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