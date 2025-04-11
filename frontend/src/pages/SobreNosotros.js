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
        <div className="banner-texto">
          <h1>Sobre Nosotros</h1>
          <p>
            En <strong>Sabores Ocultos</strong> creemos que cada experiencia debería ser inolvidable.  
            Creamos mystery boxes con productos cuidadosamente seleccionados para los amantes del sabor y la sorpresa.
          </p>
        </div>
        <div className="banner-imagen">
          <img src="logo192.png" alt="Sobre Nosotros" />
        </div>
      </section>

      <section className="nuestros-valores">
        <h2>Nuestros Valores</h2>
        <div className="valores-cards">
          <div className="card">
            <h3>Innovación</h3>
            <p>Buscamos constantemente nuevas formas de sorprender a nuestros clientes.</p>
          </div>
          <div className="card">
            <h3>Calidad</h3>
            <p>Seleccionamos productos de la más alta calidad para cada caja.</p>
          </div>
          <div className="card">
            <h3>Pasión</h3>
            <p>Amamos lo que hacemos y eso se refleja en cada detalle.</p>
          </div>
          <div className="card">
            <h3>Confianza</h3>
            <p>Construimos relaciones sólidas con nuestros clientes y socios.</p>
          </div>
          <div className="card">
            <h3>Sostenibilidad</h3>
            <p>Nos preocupamos por el medio ambiente y usamos empaques responsables.</p>
          </div>
          <div className="card">
            <h3>Trabajo en Equipo</h3>
            <p>Creemos en la colaboración para lograr grandes resultados.</p>
          </div>
        </div>
      </section>

      <section className="nosotros-mision">
        <h2>Nuestra Misión</h2>
        <div className="mision-cards">
          <div className="card">
            <h3>Explorar Sabores</h3>
            <p>Descubrimos nuevos sabores para sorprender a nuestros clientes.</p>
          </div>
          <div className="card">
            <h3>Crear Experiencias</h3>
            <p>Diseñamos cada caja para que sea una experiencia única.</p>
          </div>
          <div className="card">
            <h3>Conectar Personas</h3>
            <p>Unimos a las personas a través de la pasión por los sabores.</p>
          </div>
        </div>
      </section>

      <section className="nosotros-vision">
        <h2>Nuestra Visión</h2>
        <div className="vision-cards">
          <div className="card">
            <h3>Ser Líderes</h3>
            <p>Convertirnos en la marca líder en experiencias de sabores.</p>
          </div>
          <div className="card">
            <h3>Innovar Constantemente</h3>
            <p>Estar a la vanguardia en la creación de productos únicos.</p>
          </div>
          <div className="card">
            <h3>Impacto Positivo</h3>
            <p>Dejar una huella positiva en nuestros clientes y el medio ambiente.</p>
          </div>
        </div>
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
