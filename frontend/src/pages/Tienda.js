import React from 'react';
import '../styles/Main.css'; // Reutilizando estilos
import '../styles/Tienda.css'; // Estilos específicos
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const productos = [
  {
    id: 1,
    nombre: 'Botella Artesanal',
    precio: '$120',
    descripcion: 'Licor especial hecho con ingredientes locales.',
    imagen: require('../asserts/Galeria/mezcal.jpg'),
  },
  {
    id: 2,
    nombre: 'Cafe Gourmet',
    precio: '$80',
    descripcion: 'Crujiente, sabroso y con un toque de picante.',
    imagen: require('../asserts/Galeria/cafe.jpg'),
  },
  {
    id: 3,
    nombre: 'Vino - Chocolate',
    precio: '$200',
    descripcion: 'Una pequeña caja con productos sorpresa.',
    imagen: require('../asserts/Galeria/vino_chocolate.jpg'),
  },
  // Puedes agregar más productos
];

const Tienda = () => {
  const navigate = useNavigate();

  const handleAgregarCarrito = (nombre) => {
    alert(`Agregado al carrito: ${nombre}`);
  };

  const handleComprar = (nombre) => {
    alert(`Has comprado: ${nombre}`);
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

      <div className="center-title">Sabores Ocultos</div>

      <h1 className="titulo-tienda">Nuestros Productos</h1>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="card-producto" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="precio">{producto.precio}</p>
            <div className="botones-producto">
              <button onClick={() => handleAgregarCarrito(producto.nombre)}>Agregar al carrito</button>
              <button onClick={() => handleComprar(producto.nombre)}>Comprar</button>
            </div>
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
