import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import { FaCrown, FaStar, FaBoxOpen, FaGift } from 'react-icons/fa'; 
import '../styles/Main.css';

const Main = () => {
  const navigate = useNavigate(); // Para la navegación
  const [selectedCard, setSelectedCard] = useState(1);
  const rotationInterval = 50000;
  const timeoutRef = useRef(null);
  const [showAgeConfirmation, setShowAgeConfirmation] = useState(() => {
    return sessionStorage.getItem('isAgeConfirmed') !== 'true';
  });

  const cards = [
    {
      id: 1,
      title: 'NUESTRA MYSTERY BOX',
      description:
        'Nuestra Mystery Box es una experiencia única que lleva lo mejor de los productos artesanales y gourmet del país directamente a las manos de los consumidores. Es una caja con una selección exclusiva de vino, mezcales, cafés, chocolates, cervezas y más, cuidadosamente elegidos para sorprender y deleitar, mientras conectan con las historias y tradiciones de los productores locales.',
      image: '/imagenes/Galeria/manos.jpg',
    },
    {
      id: 2,
      title: 'EXPLORA SABORES',
      description: 'Descubre sabores auténticos y experiencias inolvidables con nuestras mystery boxes.',
      image: '/imagenes/Galeria/9.jpg',
    },
    {
      id: 3,
      title: 'PORQUE ELEGIR NUESTRAS MYSTERY BOXES',
      image: '/imagenes/Galeria/7.jpg',
      customContent: (
        <div className="mystery-box-cards">
          <div className="mystery-box-card-column">
            <div className="mystery-box-card">
              <FaCrown color="#ff9800" size={24} />
              <h3>Selcción Premium</h3>
              <p>Disfruta de productos seleccionados con altos estándares de calidad.</p>
            </div>
            
            <div className="mystery-box-card">
              <FaStar color="#ff9800" size={24} />
              <h3>Sorpresa Garantizada</h3>
              <p>Cada caja está pensada para brindarte una experiencia única e inesperada.</p>
            </div>
          </div>
          
          <div className="mystery-box-card-column">
            <div className="mystery-box-card">
              <FaBoxOpen color="#ff9800" size={24} />
              <h3>Ediciones Limitadas</h3>
              <p>Productos que no encontrarás en ningún otro lugar, por tiempo limitado.</p>
            </div>
            
            <div className="mystery-box-card">
              <FaGift color="#ff9800" size={24} />
              <h3>Regalo Perfecto</h3>
              <p>Ideal para compartir y sorprender a alguien especial.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'QUE SON LAS MYSTERY BOXES',
      description: 'Nuestras mystery boxes son una selección única de productos exclusivos cuidadosamente elegidos para sorprenderte. Descubre sabores auténticos y experiencias inolvidables.',
      image: '/imagenes/Galeria/10.jpg',
    },
  ];

  const handleCardClick = (id) => {
    setSelectedCard(id);
    resetTimeout();
  };

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  const handleAgeConfirmation = () => {
    sessionStorage.setItem('isAgeConfirmed', 'true'); 
    setShowAgeConfirmation(false); 
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setSelectedCard((prev) => (prev === cards.length ? 1 : prev + 1));
    }, rotationInterval);

    return () => clearTimeout(timeoutRef.current);
  }, [selectedCard]);

  return (
    <div className="main-container">
      <Header />
      {showAgeConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Bienvenido a Sabores Ocultos</h2>
            <p>
              Este sitio está dedicado a la venta y promoción de bebidas alcohólicas como vino, mezcal, tequila y otros productos selectos. Promovemos el disfrute consciente y responsable del alcohol.
            </p>
            <p>
              El consumo de bebidas alcohólicas está estrictamente prohibido para menores de edad. Acceder a este sitio implica que usted reconoce ser mayor de edad legal en su país y se compromete a consumir nuestros productos con moderación.
            </p>
            <p>
              El abuso del alcohol puede ser perjudicial para la salud. Recomendamos siempre beber con responsabilidad y evitar el consumo excesivo.
            </p>
            <p className="modal-question">¿Eres mayor de edad y aceptas nuestra política de consumo responsable?</p>
            <div className="modal-buttons">
              <button onClick={handleAgeConfirmation}>Sí</button>
              <button onClick={() => (window.location.href = 'https://www.google.com')}>No</button>
            </div>
          </div>
        </div>
      )}

      <div
        className="pregunta-banner"
        style={{
          backgroundImage: `url(${cards.find((card) => card.id === selectedCard).image})`,
        }}
      >
        {/* Título fijo arriba izquierda */}
        <h1 className="banner-main-title">SABORES OCULTOS</h1>

        {/* Texto seleccionado a la izquierda */}
        <div className="selected-card-text">
          <h2>{cards.find((card) => card.id === selectedCard).title}</h2>
          <p>{cards.find((card) => card.id === selectedCard).description}</p>
          
          {/* Contenido personalizado para la card 3 */}
          {selectedCard === 3 && cards[2].customContent}
        </div>

        {/* Cards pequeñas y barra de progreso a la derecha */}
        <div className="cards-container">
          {cards
            .filter((card) => card.id !== selectedCard)
            .map((card) => (
              <div
                key={card.id}
                className="mystery-box-card"
                onClick={() => handleCardClick(card.id)}
                title={card.title}
              >
                <div className="card-title-small">{card.title}</div>
              </div>
            ))}

          <div className="progress-bar-container">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`progress-segment ${card.id === selectedCard ? 'active' : ''}`}
                style={{ animationDuration: `${rotationInterval}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Main;