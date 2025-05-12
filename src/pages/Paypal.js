import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder } from '../services/api'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/PayPal.css';

const PayPal = () => {
  const { cartItems } = useCart();
  const { currentUser, refreshUserData } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [userReady, setUserReady] = useState(false);

  // Calcular el subtotal general
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Estado para forzar la re-renderización del botón de PayPal
  const [paypalKey, setPaypalKey] = useState(0);

  // Actualiza la clave del botón de PayPal cada vez que el subtotal cambie
  useEffect(() => {
    if (currentUser) {
      setUserReady(true);
      setPaypalKey(prev => prev + 1); 
    }
  }, [currentUser, subtotal]);
  // Determinar la página anterior
  const previousPage = location.state?.from || '/tienda'; 

  // Función para confirmar la compra
  const handleConfirmPurchase = async () => {
    const userId = currentUser?.uid; 
    if (!userId) {
        alert('No se pudo identificar al usuario. Por favor, inicia sesión.');
        return;
    }

    const orderData = cartItems.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio,
    }));
    const total = subtotal.toFixed(2);

    const result = await createOrder(userId, orderData, total);

    if (result.success) {
      alert('Compra confirmada exitosamente.');
      await refreshUserData(userId);
      navigate('/main');
    } else {
      alert('Error al confirmar la compra. Inténtalo de nuevo.');
      console.error(result.message);
    }
  };

  return (
    <>
      {/* Header fuera del contenedor principal */}
      <Header />

      {/* Contenedor central que incluye resumen y botón de regreso */}
      <div className="checkout-container">
        <div className="checkout-content">
          <h2>Resumen de Compra</h2>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="checkout-items">
                {cartItems.map((item, index) => (
                  <li key={index} className="checkout-item">
                    <div className="item-name">{item.nombre}</div>
                    <div className="item-quantity">Cantidad: {item.cantidad}</div>
                    <div className="item-subtotal">
                      Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="checkout-summary">
                <p>
                  <strong>Total:</strong> ${subtotal.toFixed(2)}
                </p>
              </div>
              
              {/* Botón de PayPal con clave única */}
              {userReady && (
                <PayPalButton key={paypalKey} total={subtotal} />
              )}
              <div className="checkout-actions">
                <button className="back-button" onClick={() => navigate(previousPage)}>
                  Regresar
                </button>
                <button className="confirm-button" onClick={handleConfirmPurchase}>
                  Confirmar compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer fuera del contenedor principal */}
      <Footer />
    </>
  );
};

export default PayPal;