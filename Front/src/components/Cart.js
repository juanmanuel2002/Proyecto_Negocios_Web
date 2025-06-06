import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import ModalMensaje from '../components/ModalMensaje'; 
import DireccionControl from '../components/DireccionControl';
import { useDireccionControl } from '../utils/useDireccionControl'; 
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const { isLoggedIn, setRedirectPath, currentUser } = useAuth(); 
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false); 
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false); 
  const [validationMessage, setValidationMessage] = useState(''); 
  const [isStockModalOpen, setIsStockModalOpen] = useState(false); 
  const [stockMessage, setStockMessage] = useState(''); 

  
  const {
    showDireccionControl,
    abrirDireccionControl,
    cerrarDireccionControl,
  } = useDireccionControl();

  // Calcular el subtotal general sumando los subtotales de todos los productos
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleCheckout = () => {
    const tieneProductos = cartItems.some((item) => !item.nombre.includes('Suscripción'));
    const tieneSuscripcion = cartItems.some((item) => item.nombre.includes('Suscripción'));

    if (tieneProductos && tieneSuscripcion) {
      setValidationMessage('No puedes proceder con la compra porque intentas agregar una suscripción y productos en el mismo pedido.');
      setIsValidationModalOpen(true);
      return;
    }
    if (isLoggedIn) {
      abrirDireccionControl(); 
    } else {
      setRedirectPath('/paypal'); 
      setShowMessage(true); 
      setTimeout(() => {
        setShowMessage(false); 
        navigate('/login'); 
      }, 3000);
    }
  };

  const handleDireccionConfirmada = () => {
    cerrarDireccionControl();
    navigate('/paypal', { state: { from: '/carrito' } });
  };

  const handleIncrement = (item) => {
    if (item.nombre.includes('Suscripción')) {
      setValidationMessage('No puedes agregar más unidades de una suscripción.');
      setIsValidationModalOpen(true);
      return;
    }

    if (item.cantidad < item.unidadesDisponibles) {
      updateCartItemQuantity(item.nombre, item.cantidad + 1);
    } else {
      setStockMessage(
        `No puedes agregar más unidades de "${item.nombre}". Solo hay ${item.unidadesDisponibles} disponibles en total.`
      );
      setIsStockModalOpen(true);
    }
  };

  const closeValidationModal = () => {
    setIsValidationModalOpen(false);
    setValidationMessage('');
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                {/* Fila 1: Nombre del producto */}
                <div className="item-name">{item.nombre}</div>

                {/* Fila 2: Cantidad con botones */}
                <div className="item-quantity">
                  Cantidad:
                  <button
                    className="quantity-button"
                    onClick={() => updateCartItemQuantity(item.nombre, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncrement(item)} 
                  >
                    +
                  </button>
                </div>

                {/* Fila 3: Subtotal y botón para eliminar */}
                <div className="item-subtotal-row">
                  <span className="item-subtotal">
                    Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
                  </span>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.nombre)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>
              <strong>Total:</strong> ${subtotal.toFixed(2)}
            </p>
          </div>

          <div className="cart-actions">
            <button onClick={clearCart}>Vaciar Carrito</button>
            <button
              className="checkout-button"
              onClick={handleCheckout} 
            >
              Continuar Compra
            </button>
          </div>
        </>
      )}

      {/* Modal para el mensaje de inicio de sesión */}
      {showMessage && (
        <ModalMensaje
          titulo="Inicio de Sesión Requerido"
          mensaje="Es necesario iniciar sesión para continuar con la compra. Redirigiendo..."
          onClose={() => setShowMessage(false)}
        />
      )}

      {/* Modal de validación */}
      {isValidationModalOpen && (
        <ModalMensaje
          titulo=""
          mensaje={validationMessage}
          onClose={closeValidationModal}
        />
      )}
      {/* Modal de validación de stock */}
      {isStockModalOpen && (
        <ModalMensaje
          titulo="Stock Insuficiente"
          mensaje={stockMessage}
          onClose={() => setIsStockModalOpen(false)}
        />
      )}

      {/* Control de dirección antes de ir a Paypal */}
      {showDireccionControl && isLoggedIn && currentUser && (
        <DireccionControl
          userId={currentUser.uid}
          onDireccionConfirmada={handleDireccionConfirmada}
        />
      )}
    </div>
  );
};

export default Cart;