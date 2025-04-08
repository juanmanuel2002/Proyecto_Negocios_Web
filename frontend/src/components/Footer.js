import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    );
};

export default Footer;