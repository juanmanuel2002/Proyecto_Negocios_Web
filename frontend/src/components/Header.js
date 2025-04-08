import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from './ThemeContext';
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="banner">
            <div className="left-nav">
                <span onClick={() => navigate('/main')}>Inicio</span>
                <span onClick={() => navigate('/nosotros')}>Sobre Nosotros</span>
                <span onClick={() => navigate('/tienda')}>Tienda</span>
                <span onClick={() => navigate('/suscripciones')}>Suscripciones</span>
            </div>
            <div className="right-nav">
                <button onClick={toggleTheme} className="theme-toggle">
                    {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
                </button>
                <ShoppingCartIcon />
                <AccountCircleIcon onClick={() => navigate('/login')} />
            </div>

            {/* Botón de menú para móviles */}
            <div className="mobile-menu-icon" onClick={toggleMenu}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>

            {/* Fondo para cerrar el menú al hacer clic fuera */}
            {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

            {/* Menú desplegable para móviles */}
            {menuOpen && (
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <span onClick={() => { navigate('/main'); toggleMenu(); }}>Inicio</span>
                    <span onClick={() => { navigate('/nosotros'); toggleMenu(); }}>Sobre Nosotros</span>
                    <span onClick={() => { navigate('/tienda'); toggleMenu(); }}>Tienda</span>
                    <span onClick={() => { navigate('/suscripciones'); toggleMenu(); }}>Suscripciones</span>
                </div>
            )}
        </header>
    );
};

export default Header;