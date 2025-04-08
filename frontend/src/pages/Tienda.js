import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../styles/Main.css';
import '../styles/Tienda.css'; 

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
];

const Tienda = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleAgregarCarrito = (nombre) => {
    alert(`Agregado al carrito: ${nombre}`);
  };

  const handleComprar = (nombre) => {
    alert(`Has comprado: ${nombre}`);
  };

  return (
    <div className="main-container">
      {/* Banner */}
      <Header/>

      <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

      <h1 data-aos="fade-up" className="titulo-tienda">Nuestros Productos</h1>

      <div className="productos-grid" data-aos="fade-up">
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
      <Footer/>
    </div>
  );
};

export default Tienda;
