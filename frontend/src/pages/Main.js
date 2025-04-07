import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Main.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import bandera from '../asserts/bandera.jpg';
import logo from '../asserts/logo.jpg';

const Main = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
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
            <div className="intro-section" data-aos="fade-up">
                <div className="intro-text">
                    <h2>¿Estás listo para abrir un pedacito de México en cada caja?</h2>
                </div>
                <div className="intro-image">
                    <img src={bandera} alt="México" />
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

            {/* Footer */}
            <footer data-aos="fade-up">
                <div className="footer-banner">
                    ©2025 Sabores Ocultos. Todos los derechos reservados.
                </div>
                <div className="footer-links">
                    <a href="#">Inicio</a>
                    <a href="#">Sobre Nosotros</a>
                    <a href="#">Artículos</a>
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