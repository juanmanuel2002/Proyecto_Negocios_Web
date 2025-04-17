import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Informational.css';

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="info-container">
        <h2>Política de Privacidad</h2>
        <p>
          En Sabores Ocultos, valoramos tu privacidad. Toda la información personal que recopilamos será usada exclusivamente para mejorar tu experiencia. No compartimos tus datos con terceros sin tu consentimiento explícito.
        </p>
        <p>
          Puedes revisar, modificar o eliminar tu información en cualquier momento desde tu cuenta o contactándonos directamente.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
