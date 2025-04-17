import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer data-aos="fade-up">
            <div className="footer-banner">
                ©2025 Sabores Ocultos. Todos los derechos reservados.
            </div>
            <div className="footer-links">
                <span onClick={() => navigate('/main')}>Inicio</span>
                <span onClick={() => navigate('/nosotros')}>Sobre Nosotros</span>
                <span onClick={() => navigate('/tienda')}>Artículos</span>
                <span onClick={() => navigate('/privacy-Policy')}>Política de Privacidad</span>
                <span onClick={() => navigate('/terms-and-conditions')}>Términos y Condiciones</span>
                <span onClick={() => navigate('/contact-us')}>Contacto</span>
                <div className="social-icons">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-twitter" />
                    <i className="fab fa-instagram" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;