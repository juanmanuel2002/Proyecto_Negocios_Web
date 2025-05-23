import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollTopButton'; 
import AOS from 'aos';
import { importMarcasImages } from '../utils/importMarcasImages';
import { importProductosImages } from '../utils/importProductosImages';
import 'aos/dist/aos.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ModalMensaje from '../components/ModalMensaje'; 
import '../styles/Suscripciones.css'; 
import '../styles/Global.css'; 
import '../styles/Header.css';
import DireccionControl from '../components/DireccionControl';
import { useDireccionControl } from '../utils/useDireccionControl';

const Suscripciones = () => {
  const { isLoggedIn, setRedirectPath, currentUser} = useAuth();
  const { clearCart, addToCart, cartItems} = useCart();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false); 
  const [validationMessage, setValidationMessage] = useState('');
  const marcasLogos = useMemo(() => importMarcasImages(),[])
  const productosImages = useMemo(() => importProductosImages(),[]);
  const productos = ['Mermeladas', 'Tequila', 'Mezcal', 'Chocolates', 'Cerveza', 'Vino', 'Cafe'];
  

  const {
    showDireccionControl,
    abrirDireccionControl,
    cerrarDireccionControl,
  } = useDireccionControl();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); 
  }, []);

  const handleCardClick = (paquete) => {
    const tieneProductos = cartItems.some((item) => !item.nombre.includes('Suscripción'));

    if (tieneProductos) {
      setValidationMessage('No puedes agregar una suscripción si ya tienes productos en el carrito. Elimina los productos para poder agregar una suscripción.');
      setIsValidationModalOpen(true);
      return;
    }

    if (isLoggedIn) {
      
      clearCart();
      addToCart({
        nombre: `${paquete.nombre}`,
        precio: paquete.precio,
        cantidad: 1,
        items: paquete.items,
      });
      abrirDireccionControl();
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

  const closeValidationModal = () => {
    setIsValidationModalOpen(false);
    setValidationMessage('');
  };

  const handleDireccionConfirmada = () => {
  cerrarDireccionControl();
  navigate('/paypal', { state: { from: '/suscripciones' } });
};

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

      {/* Modal de validación */}
      {isValidationModalOpen && (
        <ModalMensaje
          titulo=""
          mensaje={validationMessage}
          onClose={closeValidationModal}
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
          <div className="productos-cards">
            {productos.map((producto) => (
           <div className="card-producto" key={producto}>
             {/* Si no existe imagen para ese nombre, usa una genérica por defecto */}
             <img
               src={productosImages[producto] || '/assets/vinedo.jpg'}
               alt={producto}
               className="imagen-producto"
             />
             <h3>{producto}</h3>
           </div>
         ))}
          </div>
        </div>
      </div>

      {/* Sección de marcas */}
      <div className="marcas-container" data-aos="fade-up">
        <h2 className="titulo-marcas">Las marcas que puedes encontrar</h2>
        <div className="marcas-logos">
         {marcasLogos.map((src, idx) => (
          <img
              key={idx}
              src={src}
              alt={`Marca ${idx +1 }`}
              className='logo-marca'
          />
         ))}
        </div>
      </div>
      {showDireccionControl && isLoggedIn && (
        <DireccionControl
          userId={currentUser?.uid}
          onDireccionConfirmada={handleDireccionConfirmada}
        />
      )}

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Suscripciones;