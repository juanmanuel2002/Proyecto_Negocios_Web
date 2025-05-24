import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Informational.css';

const ContactUs = () => {
  return (
    <div>
      <Header />
      <div className="info-container">
        <h2>Contáctanos</h2>
        <p>¿Tienes preguntas, sugerencias o quieres saludarnos? Escríbenos:</p>
        <ul>
          <li>📧 Email: contacto@saboresocultos.com</li>
          <li>📞 Teléfono: +52 55 1234 5678</li>
          <li>📍 Dirección: Av. Misterio 123, CDMX</li>
        </ul>
      </div>
      <Footer />    
    </div>
  );
};

export default ContactUs;
