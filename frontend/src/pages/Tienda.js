import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClipLoader } from 'react-spinners'; // Importa el módulo de carga
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchProductos } from '../services/api'; // Importa la función desde api.js
import '../styles/Main.css';
import '../styles/Tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const obtenerProductos = async () => {
      const result = await fetchProductos(); // Llama a la función del servicio
      if (result.success) {
        setProductos(result.data); // Actualiza el estado con los productos
      } else {
        setError(result.message); // Maneja el error
      }
      setLoading(false); // Finaliza el estado de carga
    };

    obtenerProductos();
  }, []);

  const handleAgregarCarrito = (nombre) => {
    alert(`Agregado al carrito: ${nombre}`);
  };

  const handleComprar = (nombre) => {
    alert(`Has comprado: ${nombre}`);
  };

  return (
    <div className="main-container">
      <Header />
      <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>
      <h1 data-aos="fade-up" className="titulo-tienda">Nuestros Productos</h1>
      {loading ? (
          <p className="loading"><ClipLoader color="#6d4c41" size={50} /></p> 
      ) : error ? (
        <p className="error">Ha ocurrido un error al obtener los productos</p>
      ) : (
        <div className="productos-grid" data-aos="fade-up">
          {productos.map((producto) => (
            <div className="card-producto" key={producto.id}>
              <img
                src={`imagenes/Galeria/${producto.imagen}`}
                alt={producto.nombre}
              />
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              <p className="precio">{producto.precio}</p>
              <div className="botones-producto">
                <button onClick={() => handleAgregarCarrito(producto.nombre)}>
                  Agregar al carrito
                </button>
                <button onClick={() => handleComprar(producto.nombre)}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Tienda;