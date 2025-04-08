import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/SobreNosotros.css';
import '../styles/Global.css'; 
import '../styles/Header.css';

const SobreNosotros = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);
  return (
    <div className="main-container" >
    {/* Banner */}
    <Header />
    <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>
    
    
    <div className="sobre-nosotros-container" data-aos="fade-up">
      <section className="nosotros-banner">
        <h1>Sobre Nosotros</h1>
        <p>
          En <strong>Sabores Ocultos</strong> creemos que cada experiencia debería ser inolvidable.  
          Creamos mystery boxes con productos cuidadosamente seleccionados para los amantes del sabor y la sorpresa.
        </p>
      </section>

      <section className="nosotros-mision">
        <h2>Nuestra Misión</h2>
        <p>
          Sorprender, emocionar y conectar a las personas con nuevos sabores.  
          Queremos que cada caja sea una aventura y que nuestros clientes vivan algo distinto en cada entrega.
        </p>
      </section>

      <section className="nosotros-mision">
        <h2>Nuestra Visión</h2>
        <p>
          Sorprender, emocionar y conectar a las personas con nuevos sabores.  
          Queremos que cada caja sea una aventura y que nuestros clientes vivan algo distinto en cada entrega.
        </p>
    </section>

    <section className="nosotros-equipo">
        <h2>Nuestro Equipo</h2>
        <div className="equipo-cards">
          <div className="card">
            <img src="/equipo1.jpg" alt="Miembro del equipo 1" />
            <h3>Lucía Martínez</h3>
            <p>Fundadora & Curadora de Productos</p>
          </div>
          <div className="card">
            <img src="/equipo2.jpg" alt="Miembro del equipo 2" />
            <h3>Andrés Gómez</h3>
            <p>Diseño de Experiencia</p>
          </div>
          <div className="card">
            <img src="/equipo3.jpg" alt="Miembro del equipo 3" />
            <h3>Camila Ruiz</h3>
            <p>Relaciones con Clientes</p>
          </div>
        </div>
      </section>

    </div>
    <Footer />

    </div>
  );
};

export default SobreNosotros;
