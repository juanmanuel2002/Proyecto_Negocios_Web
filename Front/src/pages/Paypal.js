import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, updateStockProductos } from '../services/api'; 
import { useAuth } from '../context/AuthContext'; 
import DireccionControl from '../components/DireccionControl';
import { useDireccionControl } from '../utils/useDireccionControl';
import ModalMensaje from '../components/ModalMensaje'; 
import '../styles/PayPal.css';

const PayPal = () => {
  const { cartItems, clearCart } = useCart();
  const { currentUser, refreshUserData } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [userReady, setUserReady] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const {
    showDireccionControl,
    abrirDireccionControl,
    cerrarDireccionControl,
  } = useDireccionControl();
  
  const [direccionSolicitada, setDireccionSolicitada] = useState(false);

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
  const realPreviousPage = previousPage === '/carrito' || '/login' ? '/tienda' : previousPage;
  // Función para confirmar la compra
  const handleConfirmPurchase = async () => {
    const userId = currentUser?.uid; 
    if (!userId) {
        setShowFailModal(true);
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
      const productosToUpdate = cartItems.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      descripcion: item.descripcion,
      imagen: item.imagen,
      categoria: item.categoria,
      unidadesDisponibles: item.unidadesDisponibles - item.cantidad,
      }));
      
      await updateStockProductos(productosToUpdate);
      setShowSuccessModal(true);
      clearCart();
      await refreshUserData(userId);
    } else {
      setShowFailModal(true);
      console.error(result.message);
    }
  };

  const handleDireccionConfirmada = () => {
      cerrarDireccionControl();
      setDireccionSolicitada(true);
    };

  useEffect(() => {
    // Si viene de login, muestra el formulario de dirección
    if (location.state?.from === '/login' && !direccionSolicitada) {
      abrirDireccionControl();
      setDireccionSolicitada(true);
    }
  }, [location.state, abrirDireccionControl, direccionSolicitada]);

  

  return (
    <>
      <Header />

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
              
              {userReady && (
                <PayPalButton key={paypalKey} total={subtotal} />
              )}
              
              <div className="checkout-actions">
                <button className="back-button" onClick={() => navigate(realPreviousPage)}>
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
      
      {showDireccionControl && currentUser && (
        <DireccionControl
          userId={currentUser.uid}
          onDireccionConfirmada={handleDireccionConfirmada}
        />
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <ModalMensaje
          titulo="¡Compra exitosa!"
          mensaje="Tu compra ha sido confirmada exitosamente."
          onClose={() => {
            setShowSuccessModal(false);
            setTimeout(() => {
              navigate('/main');
            }, 500);
          }}
        />
      )}

      {/* Modal de fallo */}
      {showFailModal && (
        <ModalMensaje
          titulo="¡Hubo un error al realizar la compra!"
          mensaje="Favor de intertar nuevamente más tarde."
          onClose={() => {
            setShowFailModal(false);
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default PayPal;