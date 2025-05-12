import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollTopButton'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ModalMensaje from '../components/ModalMensaje'; 
import '../styles/Suscripciones.css'; 
import '../styles/Global.css'; 
import '../styles/Header.css';

const Suscripciones = () => {
  const { isLoggedIn, setRedirectPath } = useAuth();
  const { clearCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); 
  }, []);

  const handleCardClick = (paquete) => {
    if (isLoggedIn) {
      
      clearCart();
      addToCart({
        nombre: `${paquete.nombre}`,
        precio: paquete.precio,
        cantidad: 1,
        items: paquete.items,
      });
      navigate('/paypal', { state: { from: '/suscripciones' } }); 
    } else {
      setRedirectPath('/paypal');
      addToCart({
        nombre: `${paquete.nombre}`,
        precio: paquete.precio,
        cantidad: 1,
        items: paquete.items,
      }); 
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false); 
        navigate('/login'); 
      }, 3000);
    }
  };

  const productos = ['Mermelada', 'Tequila', 'Mezcal', 'Chocolate', 'Cerveza', 'Vino', 'Cafe'];

  return (
    <div className="main-container">
      <Header/>
      <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

      {/* Cards de paquetes */}
      <div className="paquetes-container">
        {[ 
          { nombre: 'Suscripción Básica', precio: 350, items: ['Una botella', 'Dos productos'] },
          { nombre: 'Suscripción Premium', precio: 550, items: ['Dos botellas', 'Cuatro productos'] },
          { nombre: 'Suscripción Exclusiva', precio: 450, items: ['Tres botellas', 'Tres productos'] },
        ].map((paquete) => (
          <div
            key={paquete.nombre}
            className="paquete-card"
            onClick={() => handleCardClick(paquete)}
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
                e.stopPropagation(); 
                handleCardClick(paquete);
              }}
            >
              Ordenar
            </button>
          </div>
        ))}
      </div>

      {/* Modal para el mensaje de inicio de sesión */}
      {showMessage && (
        <ModalMensaje
          titulo="Inicio de Sesión Requerido"
          mensaje="Es necesario iniciar sesión para continuar con la compra. Redirigiendo..."
          onClose={() => setShowMessage(false)}
        />
      )}

      <div className="conoce-mas-banner"> 
        <p>Conoce más sobre nuestros servicios</p>
        <div className="flecha-down">⬇</div>
      </div>

      {/* Sección "¿Cómo Funciona?" */}
      <div className="como-funciona-container" data-aos="fade-up">
        <h2 className="titulo-como-funciona">¿Cómo Funciona?</h2>
        <div className="pasos-container">
          {[
            { paso: '1', titulo: 'Elige tu paquete', descripcion: 'Selecciona el paquete que mejor se adapte a tus gustos.' },
            { paso: '2', titulo: 'Realiza tu pedido', descripcion: 'Completa tu pedido y elige la fecha de entrega.' },
            { paso: '3', titulo: 'Disfruta', descripcion: 'Recibe tu caja y disfruta de los sabores ocultos.' },
          ].map((paso) => (
            <div key={paso.paso} className="paso-card">
              <h3>Paso {paso.paso}: {paso.titulo}</h3>
              <p>{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección "¿Qué contiene?" */}
      <div className="que-contiene-container" data-aos="fade-up"> 
        <h2 className="titulo-que-contiene">¿Qué contiene?</h2>
        <div className="contenidos-productos">
          <div className="imagen-que-contiene">
            <img src="imagenes/Galeria/mezcal.jpg" alt="Imagen de ejemplo" />
          </div>
          <div className="productos-cards">
            {productos.map((producto, index) => (
              <div 
                className="card-producto"
                key={producto}
              >
                <h3>{producto}</h3>
                <p>Descripción del producto</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de marcas */}
      <div className="marcas-container" data-aos="fade-up">
        <h2 className="titulo-marcas">Las marcas que puedes encontrar</h2>
        <div className="marcas-logos">
          {[
            'marca1.jpg',
            'marca2.jpg',
            'marca3.jpg',
            'marca4.jpg',
          ].map((logo, index) => (
            <img
              key={index}
              src={`imagenes/marcas/${logo}`}
              alt={`Marca ${index + 1}`}
              className="logo-marca"
            />
          ))}
        </div>
      </div>

      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default Suscripciones;