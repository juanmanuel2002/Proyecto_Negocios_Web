import React, { useState, useEffect } from 'react';
import '../styles/ScrollTopButton.css'; // Asegúrate de crear este archivo para los estilos

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el botón si el usuario ha hecho scroll hacia abajo
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplaza al inicio con animación suave
  };

  return (
    showScrollButton && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ⬆
      </button>
    )
  );
};

export default ScrollToTopButton;