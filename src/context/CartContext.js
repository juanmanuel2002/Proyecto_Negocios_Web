import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (producto) => {
    const tieneProductos = cartItems.some((item) => !item.nombre.includes('Suscripción'));
    const tieneSuscripcion = cartItems.some((item) => item.nombre.includes('Suscripción'));

    if (tieneProductos && producto.nombre.includes('Suscripción')) {
      alert('No puedes agregar una suscripción si ya tienes productos en el carrito.');
      return;
    }

    if (tieneSuscripcion && !producto.nombre.includes('Suscripción')) {
      alert('No puedes agregar productos si ya tienes una suscripción en el carrito.');
      return;
    }

    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.nombre === producto.nombre);
      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        return prevCart.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      } else {
        // Si el producto no está en el carrito, agrégalo con la cantidad inicial
        return [...prevCart, { ...producto, cantidad: producto.cantidad }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.nombre !== itemName));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Función para actualizar la cantidad de un producto
  const updateCartItemQuantity = (itemName, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.nombre === itemName
          ? { ...item, cantidad: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);