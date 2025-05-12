import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth} from '../context/AuthContext'; 
import ModalMensaje from '../components/ModalMensaje'; 
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const { isLoggedIn, setRedirectPath } = useAuth(); 
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false); 

  // Calcular el subtotal general sumando los subtotales de todos los productos
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleCheckout = () => {
    const tieneProductos = cartItems.some((item) => !item.nombre.includes('Suscripción'));
    const tieneSuscripcion = cartItems.some((item) => item.nombre.includes('Suscripción'));

    if (tieneProductos && tieneSuscripcion) {
      alert('No puedes proceder con la compra porque intentas agregar una suscripcion y productos en el mismo pedido.');
      return;
    }
    if (isLoggedIn) {
      navigate('/paypal'); 
    } else {
      setRedirectPath('/paypal'); // Guardar la ruta de redirección
      setShowMessage(true); 
      setTimeout(() => {
        setShowMessage(false); 
        navigate('/login'); 
      }, 3000);
    }
  };

  const handleIncrement = (item) => {
    if (item.cantidad < item.unidadesDisponibles) {
      updateCartItemQuantity(item.nombre, item.cantidad + 1);
    } else {
      alert(`No puedes agregar más unidades de "${item.nombre}". Solo hay ${item.unidadesDisponibles} disponibles.`);
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
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
                    disabled={item.cantidad <= 1} // Evita disminuir por debajo de 1
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
    </div>
  );
};

export default Cart;