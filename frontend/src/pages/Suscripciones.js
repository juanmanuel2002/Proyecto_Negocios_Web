import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../styles/Main.css'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Tienda = () => {
  const navigate = useNavigate();

  const handleCardClick = (paquete) => {
    alert(`Paquete ${paquete} seleccionado`);
  };

  return (
    <div className="main-container">
      {/* Banner */}
      <header className="banner">
        <div className="left-nav">
            <span onClick={() => navigate('/main')}>Inicio</span>
            <span onClick={() => navigate('/nosotros')}>Sobre Nosotros</span>
            <span onClick={() => navigate('/tienda')}>Tienda</span>
            <span onClick={() => navigate('/suscripciones')}>Suscripciones</span>
        </div>
        <div className="right-nav">
            <ShoppingCartIcon />
            <AccountCircleIcon onClick={() => navigate('/login')} />
        </div>
    </header>

    {/* Título separado */}
    <div className="center-title">Sabores Ocultos</div>

      {/* Cards de paquetes */}
      <div className="paquetes-container">
        {[
          { nombre: 'Básico', precio: 350, items: ['Una botella', 'Dos productos'] },
          { nombre: 'Premium', precio: 550, items: ['Dos botellas', 'Cuatro productos'] },
          { nombre: 'Exclusiva', precio: 450, items: ['Tres botellas', 'Tres productos'] },
        ].map((paquete) => (
          <div
            key={paquete.nombre}
            className="paquete-card"
            onClick={() => handleCardClick(paquete.nombre)}
          >
            <h3>{paquete.nombre}</h3>
            <p>${paquete.precio}</p>
            <ul>
              {paquete.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevenir que el clic se dispare dos veces
                handleCardClick(paquete.nombre);
              }}
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    
      {/* Footer */}
      <footer data-aos="fade-up">
                <div className="footer-banner">
                    ©2025 Sabores Ocultos. Todos los derechos reservados.
                </div>
                <div className="footer-links">
                    <span onClick={() => navigate('/main')}>Inicio</span>
                    <span onClick={() => navigate('/nosotros')}>Sobre Nosotros</span>
                    <span onClick={() => navigate('/tienda')}>Artículos</span>
                    <a href="#">Política de Privacidad</a>
                    <a href="#">Términos y Condiciones</a>
                    <a href="#">Contacto</a>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f" />
                        <i className="fab fa-twitter" />
                        <i className="fab fa-instagram" />
                    </div>
                </div>
            </footer>
    </div>
  );
};

export default Tienda;
