import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Carrito = () => {
  return (
    <div className="main-container">
      <Header />
      <Cart />
      <Footer />
    </div>
  );
};

export default Carrito;