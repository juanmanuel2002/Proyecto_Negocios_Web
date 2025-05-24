import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from './ThemeContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart'; 
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ModalMensaje from './ModalMensaje';
import '../styles/Header.css';
import { useAuth } from '../context/AuthContext'; 
import {jwtDecode} from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { cartItems, removeFromCart, clearCart } = useCart(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth(); 
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [showUserMenu, setShowUserMenu] = useState(false); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const token = sessionStorage.getItem('token');
  let isAdmin = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role === 'admin'; 
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false); 
  };

  const capitalizeName = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Calcular el subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.precio), 0);

  // Cerrar menú de usuario al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.user-info')) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutModal(true); 
    setTimeout(() => {
    setShowLogoutModal(false);
    sessionStorage.clear();
     if (typeof logout === 'function') logout();
     if (typeof clearCart === 'function') clearCart();
     navigate('/main');
    }, 3000);
  };

  return (
    <header className="banner">
      <div className="left-nav">
        <span onClick={() => navigate('/main')}>Inicio</span>
        <span onClick={() => navigate('/nosotros')}>Sobre Nosotros</span>
        <span onClick={() => navigate('/tienda')}>Tienda</span>
        <span onClick={() => navigate('/suscripciones')}>Suscripciones</span>
        {currentUser && !isAdmin && ( // Mostrar "Mis Pedidos" solo si el usuario está logeado
          <span onClick={() => navigate('/mis-pedidos')}>Mis Pedidos</span>
        )}
        {currentUser && isAdmin && ( 
          <span onClick={() => navigate('/mis-pedidos')}>Mis Pedidos</span>
        )}
        {currentUser && isAdmin && ( 
          <span onClick={() => navigate('/admin-dashboard')}>Dashboard</span>
        )}
        
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
        {currentUser ? (
          <div className="user-info">
            <span className="user-greeting">¡Hola {capitalizeName(currentUser.name || currentUser.nombre)}!</span>
            <AccountCircleIcon
              onClick={() => setShowUserMenu((prev) => !prev)}
              style={{ cursor: 'pointer' }} />
              {showUserMenu && (
             <div className={`user-sidebar ${showUserMenu ? 'open' : ''}`}>
             <div className="user-sidebar-header">
               <h2>Mi Cuenta</h2>
               <button className="close-user-sidebar" onClick={() => setShowUserMenu(false)}>✖</button>
             </div>
             <div className="user-sidebar-content">
               <button className="user-menu-item" onClick={() => {
                setShowUserMenu(false);
                navigate('/perfil');
              }}>
                Ver Perfil
              </button>
              <button className="user-menu-item" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
              )}
          </div>
        ) : (
          <AccountCircleIcon onClick={() => navigate('/login')} />
        )}
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
          {currentUser && !isAdmin && (
            <span onClick={() => { navigate('/mis-pedidos'); toggleMenu(); }}>Mis Pedidos</span>
          )}
          {currentUser && isAdmin && ( 
            <span onClick={() => navigate('/mis-pedidos')}>Mis Pedidos</span>
          )}
          {currentUser && isAdmin && ( 
            <span onClick={() => navigate('/admin-dashboard')}>Dashboard</span>
          )}
        </div>
      )}

      {/* Fondo para cerrar el carrito al hacer clic fuera */}
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
      {showLogoutModal && (
        <ModalMensaje
          titulo="Cerrando sesión"
          mensaje="Tu sesión se está cerrando. ¡Hasta pronto!"
          onClose={() => setShowLogoutModal(false)}
          ocultarBotonCerrar={true}
        />
      )}
      
    </header>
    
    
  );
};

export default Header;