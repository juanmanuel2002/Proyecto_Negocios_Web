import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../styles/Suscripciones.css'; 
import '../styles/Global.css'; 
import '../styles/Header.css';

const Suscripciones = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleCardClick = (paquete) => {
    alert(`Paquete ${paquete} seleccionado`);
  };

  return (
    <div className="main-container">
    {/* Banner */}
    <Header/>
    <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

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
      <Footer />
    </div>
  );
};

export default Suscripciones;
