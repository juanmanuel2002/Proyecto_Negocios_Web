import React from 'react';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/PayPal.css';

const PayPal = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

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
              <PayPalButton total={subtotal} />
              <div className="checkout-actions">
                <button className="back-button" onClick={() => navigate('/tienda')}>
                  Regresar
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
