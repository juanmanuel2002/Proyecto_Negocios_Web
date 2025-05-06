import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();
  // Calcular el subtotal general sumando los subtotales de todos los productos
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

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
                    onClick={() => updateCartItemQuantity(item.nombre, item.cantidad + 1)}
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
              onClick={() => navigate('/paypal')}>
              Continuar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;