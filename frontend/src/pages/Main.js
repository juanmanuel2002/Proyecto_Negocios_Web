import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import logo from '../asserts/logo.jpg';
import Carousel from '../components/Carousel';
import MysteryBoxCard from '../components/MysteryBoxCards';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Global.css';
import '../styles/Main.css';
import { FaCrown, FaGift, FaBoxOpen, FaStar } from 'react-icons/fa'; 


const Main = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);
    const navigate = useNavigate();

    // Aquí estás usando imágenes que deben estar en public/images
    const images = [
        '/imagenes/Galeria/cafe.jpg',
        '/imagenes/Galeria/cerveza.jpg',
        '/imagenes/Galeria/mezcal.jpg',
        '/imagenes/Galeria/regalo.jpg',
        '/imagenes/Galeria/articulos.jpg',
        '/imagenes/Galeria/vino_chocolate.jpg'
    ];

    return (
        <div className="main-container" >
            {/* Banner */}
            <Header />
            <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

            {/* Bloque de la pregunta + imagen */}
            <div className="pregunta-banner" data-aos="fade-up">
            <div className="overlay-text" data-aos="fade-up">

                <h2 data-aos="fade-up">¿Estás listo para abrir una caja llena de sabor y misterio? </h2>
            </div>
            </div>

            {/* Logo + descripción */}
            <div className="about-box" data-aos="zoom-in">
                <div className="logo-circle">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="description">
                    <p>
                        Nuestra Mystery Box es una experiencia única que lleva lo mejor de los productos artesanales y gourmet del país directamente a las manos de los consumidores. Es una caja con una selección exclusiva de vino, mezcales, cafés, chocolates, cervezas y más, cuidadosamente elegidos para sorprender y deleitar, mientras conectan con las historias y tradiciones de los productores locales.
                    </p>
                </div>
            </div>

            <Carousel images={images} />
            
            {/* Definicion de mistery box */}
            <div className="mystery-box-section" data-aos="fade-up">
            <div className="mystery-box-content">
                {/* Columna Izquierda */}
                <div className="mystery-box-text">
                <h2>¿Qué son las mystery boxes?</h2>
                <p>
                    Nuestras mystery boxes son una selección única de productos exclusivos cuidadosamente elegidos para sorprenderte. 
                    Descubre sabores auténticos y experiencias inolvidables.
                </p>
                <button onClick = {() => navigate('/tienda')} className="descubre-btn">Descubre más </button>
                </div>

                {/* Columna Derecha - Cards */}
                <div className="mystery-box-cards">
                    <MysteryBoxCard
                        icon={FaCrown}
                        title="Selección Premium"
                        description="Disfruta de productos seleccionados con altos estándares de calidad."
                    />
                    <MysteryBoxCard
                        icon={FaStar}
                        title="Sorpresa Garantizada"
                        description="Cada caja está pensada para brindarte una experiencia única e inesperada."
                    />
                    <MysteryBoxCard
                        icon={FaBoxOpen}
                        title="Ediciones Limitadas"
                        description="Productos que no encontrarás en ningún otro lugar, por tiempo limitado."
                    />
                    <MysteryBoxCard
                        icon={FaGift}
                        title="Regalo Perfecto"
                        description="Ideal para compartir y sorprender a alguien especial."
                    />
                </div>
            </div>
            </div>

            {/* Unete a nuestra comunidad */}
            <div className="comunidad-section" data-aos="fade-up">
            <h2>Únete a nuestra comunidad</h2>
            <p>Recibe noticias, promociones y contenido exclusivo antes que nadie.</p>
            <button className="suscribirse-btn" onClick={() => window.location.href = '/suscripciones'}>
                Suscribirse
            </button>
            </div>

            <Footer />
        </div>
    );
};

export default Main;