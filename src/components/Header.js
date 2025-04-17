import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from './ThemeContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart'; // Importa el componente Cart
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { cartItems, removeFromCart, clearCart } = useCart(); // Obtén los productos del carrito
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para el sidebar del carrito

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Alterna la visibilidad del carrito
  };

  const closeCart = () => {
    setIsCartOpen(false); // Cierra el carrito
  };

  // Calcular el subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.precio), 0);

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
        <div className="cart-icon-container" onClick={toggleCart}>
          <ShoppingCartIcon />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>
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
          
      {/* Fondo para cerrar el menú al hacer clic fuera */}
      {isCartOpen && <div className="cart-overlay" onClick={closeCart}></div>}

      {/* Sidebar del carrito */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>Carrito de Compras</h2>
          <button className="close-cart" onClick={closeCart}>✖</button>
        </div>
        <div className="cart-sidebar-content">
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            subtotal={subtotal}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;