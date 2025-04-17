import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Informational.css';

const TermsAndConditions = () => {
  return (
    <div>
      <Header />
      <div className="info-container">
        <h2>Términos y Condiciones</h2>
        <p>
          Al utilizar este sitio aceptas nuestros términos. Las cajas misteriosas de Sabores Ocultos están sujetas a disponibilidad y cambios sin previo aviso.
        </p>
        <p>
          No nos hacemos responsables por daños o pérdidas que resulten del mal uso de nuestros productos. El contenido de las cajas es sorpresa, y no se aceptan devoluciones.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
