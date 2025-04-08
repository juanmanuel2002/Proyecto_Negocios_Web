import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/Header.css'; 

const Header = () => {
    const navigate = useNavigate();

    return (
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
    );
};

export default Header;