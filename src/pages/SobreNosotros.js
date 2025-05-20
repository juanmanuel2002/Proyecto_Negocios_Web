import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card'; 
import ScrollToTopButton from '../components/ScrollTopButton'; 
import '../styles/SobreNosotros.css';
import '../styles/Global.css'; 
import '../styles/Header.css';

const SobreNosotros = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const valores = [
    { titulo: 'Innovación', descripcion: 'Buscamos constantemente nuevas formas de sorprender a nuestros clientes.' },
    { titulo: 'Calidad', descripcion: 'Seleccionamos productos de la más alta calidad para cada caja.' },
    { titulo: 'Pasión', descripcion: 'Amamos lo que hacemos y eso se refleja en cada detalle.' },
    { titulo: 'Confianza', descripcion: 'Construimos relaciones sólidas con nuestros clientes y socios.' },
    { titulo: 'Sostenibilidad', descripcion: 'Nos preocupamos por el medio ambiente y usamos empaques responsables.' },
    { titulo: 'Trabajo en Equipo', descripcion: 'Creemos en la colaboración para lograr grandes resultados.' },
  ];

  const mision = [
    { titulo: 'Explorar Sabores', descripcion: 'Descubrimos nuevos sabores para sorprender a nuestros clientes.' },
    { titulo: 'Crear Experiencias', descripcion: 'Diseñamos cada caja para que sea una experiencia única.' },
    { titulo: 'Conectar Personas', descripcion: 'Unimos a las personas a través de la pasión por los sabores.' },
  ];

  const vision = [
    { titulo: 'Ser Líderes', descripcion: 'Convertirnos en la marca líder en experiencias de sabores.' },
    { titulo: 'Innovar Constantemente', descripcion: 'Estar a la vanguardia en la creación de productos únicos.' },
    { titulo: 'Impacto Positivo', descripcion: 'Dejar una huella positiva en nuestros clientes y el medio ambiente.' },
  ];

  const equipo = [
    { titulo: 'Barragán Rivera Diego', descripcion: 'Fundadora & Curadora de Productos', imagen: '/equipo1.jpg' },
    { titulo: 'Chávez Villanueva Giovanni Salvador', descripcion: 'Diseño de Experiencia', imagen: '/imagenes/team/chava.jpeg' },
    { titulo: 'García Acosta Anyela Mariela', descripcion: 'Relaciones con Clientes', imagen: '/equipo3.jpg' },
    { titulo: 'Miranda Rayón Juan Manuel', descripcion: 'Relaciones con Clientes', imagen: '/equipo3.jpg' },
    { titulo: 'Rojo López Luis Felipe', descripcion: 'Relaciones con Clientes', imagen: '/equipo3.jpg' },
    { titulo: 'Torres Gracian Christian Iván', descripcion: 'Relaciones con Clientes', imagen: '/equipo3.jpg' }
  ];

  return (
    <div className="main-container">
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
            <img src="logo_nombre.svg" alt="Sobre Nosotros" />
          </div>
        </section>

        <section className="nuestros-valores">
          <h2>Nuestros Valores</h2>
          <div className="valores-cards">
            {valores.map((valor, index) => (
              <Card key={index} titulo={valor.titulo} descripcion={valor.descripcion} />
            ))}
          </div>
        </section>

        <section className="nosotros-mision">
          <h2>Nuestra Misión</h2>
          <div className="mision-cards">
            {mision.map((item, index) => (
              <Card key={index} titulo={item.titulo} descripcion={item.descripcion} />
            ))}
          </div>
        </section>

        <section className="nosotros-vision">
          <h2>Nuestra Visión</h2>
          <div className="vision-cards">
            {vision.map((item, index) => (
              <Card key={index} titulo={item.titulo} descripcion={item.descripcion} />
            ))}
          </div>
        </section>

        <section className="nosotros-equipo">
          <h2>Nuestro Equipo</h2>
          <div className="equipo-cards">
            {equipo.map((miembro, index) => (
              <Card key={index} titulo={miembro.titulo} descripcion={miembro.descripcion} imagen={miembro.imagen} />
            ))}
          </div>
        </section>
      </div>

      <ScrollToTopButton />
      
      <Footer />
    </div>
  );
};

export default SobreNosotros;