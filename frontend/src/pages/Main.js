import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Main.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../asserts/logo.jpg';
import cafe from '../asserts/Galeria/cafe.jpg';
import cerveza from '../asserts/Galeria/cerveza.jpg';
import mezcal from '../asserts/Galeria/mezcal.jpg';
import regalo from '../asserts/Galeria/regalo.jpg';
import articulos from '../asserts/Galeria/articulos.jpg';
import vino_chocolate from '../asserts/Galeria/vino_chocolate.jpg';
import { FaCrown, FaGift, FaBoxOpen, FaStar } from 'react-icons/fa'; // Agrega esto arriba


const Main = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);
    const navigate = useNavigate();

    return (
        <div className="main-container">
            {/* Navegación superior */}
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

            {/* Título separado */}
            <div className="center-title">Sabores Ocultos</div>

            {/* Bloque de la pregunta + imagen */}
            <div className="pregunta-banner" data-aos="fade-up">
            <div className="overlay-text">
                <h2>¿Estás listo para abrir una caja llena de sabor y misterio?</h2>
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

            <div className="carousel-wrapper" data-aos="fade-up">
            <div className="carousel-track">
                {[cafe, cerveza, mezcal, regalo, articulos, vino_chocolate].map((img, idx) => (
                <div className="carousel-item" key={idx}>
                    <img src={img} alt={`Galería ${idx + 1}`} />
                </div>
                ))}
                {/* Duplica para scroll infinito visual */}
                {[cafe, cerveza, mezcal, regalo, articulos, vino_chocolate].map((img, idx) => (
                <div className="carousel-item" key={`copy-${idx}`}>
                    <img src={img} alt={`Galería ${idx + 1} (duplicado)`} />
                </div>
                ))}
            </div>
            </div>
            
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
                <div className="card-box">
                    <FaCrown size={30} color="#6d4c41" />
                    <h4>Selección Premium</h4>
                    <p>Disfruta de productos seleccionados con altos estándares de calidad.</p>
                </div>
                <div className="card-box">
                    <FaStar size={30} color="#6d4c41" />
                    <h4>Sorpresa Garantizada</h4>
                    <p>Cada caja está pensada para brindarte una experiencia única e inesperada.</p>
                </div>
                <div className="card-box">
                    <FaBoxOpen size={30} color="#6d4c41" />
                    <h4>Ediciones Limitadas</h4>
                    <p>Productos que no encontrarás en ningún otro lugar, por tiempo limitado.</p>
                </div>
                <div className="card-box">
                    <FaGift size={30} color="#6d4c41" />
                    <h4>Regalo Perfecto</h4>
                    <p>Ideal para compartir y sorprender a alguien especial.</p>
                </div>
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



            {/* Footer */}
            <footer data-aos="fade-up">
                <div className="footer-banner">
                    ©2025 Sabores Ocultos. Todos los derechos reservados.
                </div>
                <div className="footer-links">
                    <span onClick={() => navigate('/main')}>Inicio</span>
                    <a href="#">Sobre Nosotros</a>
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

export default Main;