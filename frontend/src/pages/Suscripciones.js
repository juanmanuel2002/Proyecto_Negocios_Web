import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Suscripciones.css'; 
import '../styles/Global.css'; 
import '../styles/Header.css';

const Suscripciones = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); 
  }, []);

  const handleCardClick = (paquete) => {
    alert(`Paquete ${paquete} seleccionado`);
  };

  const productos = ['Mermelada', 'Tequila', 'Mezcal', 'Chocolate', 'Cerveza', 'Vino', 'Cafe'];

  return (
    <div className="main-container">
      <Header/>
      <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

      {/* Cards de paquetes */}
      <div className="paquetes-container">
        {[ 
          { nombre: 'Básico', precio: 350, items: ['Una botella', 'Dos productos'] },
          { nombre: 'Premium', precio: 550, items: ['Dos botellas', 'Cuatro productos'] },
          { nombre: 'Exclusiva', precio: 450, items: ['Tres botellas', 'Tres productos'] },
        ].map((paquete) => (
          <div
            key={paquete.nombre}
            className="paquete-card"
            onClick={() => handleCardClick(paquete.nombre)}
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
                e.stopPropagation(); // Prevenir que el clic se dispare dos veces
                handleCardClick(paquete.nombre);
              }}
            >
              Ordenar
            </button>
          </div>
        ))}
      </div>

      <div className = "conoce-mas-banner"> 
        <p>Conoce mas sobre nuestros servicios</p>
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
                className={`card-producto ${productos.length % 2 === 1 && index === productos.length - 1 ? 'centered' : ''}`} 
                key={producto}
              >
                <h3>{producto}</h3>
                <p>Descripción del producto</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección lo que opinan nuestros clientes */}
      <div className="opinan-container" data-aos="fade-up">
      <h2 className="titulo-opinan">Lo que opinan nuestros clientes</h2>
      <div className="opinan-cards">
        {[{
          nombre: 'Juan Pérez',
          descripcion: 'Me encantaron los productos, el servicio es excelente y la calidad es insuperable.'
        },
        {
          nombre: 'Ana García',
          descripcion: '¡Una experiencia única! Recibí todo justo a tiempo y los productos son deliciosos.'
        }].map((opinion, index) => (
          <div className="card-opinion" key={index}>
            <h3>{opinion.nombre}</h3>
            <p>{opinion.descripcion}</p>
          </div>
        ))}
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

      <Footer />
    </div>
  );
};

export default Suscripciones;
