import React from 'react';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart, clearCart, subtotal }) => {
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
                <span>{item.nombre}</span>
                <span>${parseFloat(item.precio).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.nombre)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
            <p><strong>Total:</strong> ${subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-actions">
            <button onClick={clearCart}>Vaciar Carrito</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;