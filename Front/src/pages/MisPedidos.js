import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchPedidos, deletePedido } from '../services/api';
import ModalMensaje from '../components/ModalMensaje';
import '../styles/MisPedidos.css';

const MisPedidos = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productosVisibles, setProductosVisibles] = useState({});
  const [activosVisibles, setActivosVisibles] = useState(true); 
  const [completadosVisibles, setCompletadosVisibles] = useState(true); 
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Estado para el modal de confirmación
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito
  const [selectedPedidoId, setSelectedPedidoId] = useState(null); // Pedido seleccionado para cancelar
  const [cancelMessage, setCancelMessage] = useState(''); // Mensaje del modal de cancelación

  useEffect(() => {
    const cargarPedidos = async () => {
      if (!currentUser) return;

      const result = await fetchPedidos(currentUser.uid);
      if (result.success) {
        setPedidos(result.data);
        const visibilidadInicial = result.data.reduce((acc, pedido) => {
          acc[pedido.id] = false;
          return acc;
        }, {});
        setProductosVisibles(visibilidadInicial);
      } else if (result.status === 404) {
        setError('No se encontraron pedidos para este usuario.');
      }
      setLoading(false);
    };

    cargarPedidos();
  }, [currentUser]);

  const toggleProductosVisibles = (pedidoId) => {
    setProductosVisibles((prevState) => ({
      ...prevState,
      [pedidoId]: !prevState[pedidoId],
    }));
  };

  const handleVolverAComprar = (producto) => {
    if (producto.nombre.includes('Suscripción')) {
      navigate('/suscripciones');
    } else {
      navigate('/tienda');
    }
  };

  const handleOpenCancelModal = (pedidoId) => {
    setSelectedPedidoId(pedidoId);
    setCancelMessage(
      '¿Estás seguro de que deseas cancelar este pedido? Perderás los productos solicitados. Consulta nuestra política de cancelación para más información.'
    );
    setIsCancelModalOpen(true);
  };

  const handleCancelPedido = async () => {
    if (!selectedPedidoId) return;

    const result = await deletePedido(selectedPedidoId);
    if (result.success) {
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== selectedPedidoId));
      setIsCancelModalOpen(false);
      setIsSuccessModalOpen(true); // Mostrar modal de éxito
    } else {
      alert(result.message || 'Error al cancelar el pedido.');
      setIsCancelModalOpen(false);
    }
    setSelectedPedidoId(null);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedPedidoId(null);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/main'); // Redirigir al usuario a /main
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <p>Cargando pedidos...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="error-container">
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  const pedidosActivos = pedidos.filter((pedido) => pedido.estado === 'ACTIVO');
  const pedidosCompletados = pedidos.filter((pedido) => pedido.estado === 'COMPLETADO');

  return (
    <>
      <Header />
      <div className="mis-pedidos-container">
        <h1>Mis Pedidos</h1>

        {/* Pedidos Activos */}
        <div className="pedidos-activos">
          <h2>
            Pedidos Activos
            <button
              className="toggle-seccion-btn"
              onClick={() => setActivosVisibles(!activosVisibles)}
            >
              {activosVisibles ? 'Ocultar' : 'Mostrar'}
            </button>
          </h2>
          {activosVisibles && (
            <ul>
              {pedidosActivos.map((pedido) => (
                <li key={pedido.id} className="pedido-card activo">
                  <div className="pedido-info">
                    <p><strong>Número de Pedido:</strong> {pedido.id}</p>
                    <p><strong>Fecha del pedido:</strong> {new Date(pedido.creado).toLocaleDateString()}</p>
                    <p><strong>Total del pedido:</strong> ${pedido.total}</p>
                    <button
                      className="toggle-productos-btn"
                      onClick={() => toggleProductosVisibles(pedido.id)}
                    >
                      {productosVisibles[pedido.id] ? 'Ocultar Productos' : 'Mostrar Productos'}
                    </button>
                    <button
                      className="cancelar-pedido-btn"
                      onClick={() => handleOpenCancelModal(pedido.id)}
                    >
                      Cancelar Pedido
                    </button>
                  </div>
                  {productosVisibles[pedido.id] && (
                    <div className="pedido-productos">
                      <h3>Productos:</h3>
                      {Object.values(pedido.orderData).map((producto, index) =>
                        producto.nombre ? (
                          <div key={index} className="producto">
                            <p><strong>Nombre:</strong> {producto.nombre}</p>
                            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            <button
                              className="volver-a-comprar-btn"
                              onClick={() => handleVolverAComprar(producto)}
                            >
                              Volver a Comprar
                            </button>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pedidos Completados */}
        <div className="pedidos-completados">
          <h2>
            Historial de pedidos
            <button
              className="toggle-seccion-btn"
              onClick={() => setCompletadosVisibles(!completadosVisibles)}
            >
              {completadosVisibles ? 'Ocultar' : 'Mostrar'}
            </button>
          </h2>
          {completadosVisibles && (
            <ul>
              {pedidosCompletados.map((pedido) => (
                <li key={pedido.id} className="pedido-card completado">
                  <div className="pedido-info">
                    <p><strong>Número de Pedido:</strong> {pedido.id}</p>
                    <p><strong>Fecha del pedido:</strong> {new Date(pedido.creado).toLocaleDateString()}</p>
                    <p><strong>Total del pedido:</strong> ${pedido.total}</p>
                    <button
                      className="toggle-productos-btn"
                      onClick={() => toggleProductosVisibles(pedido.id)}
                    >
                      {productosVisibles[pedido.id] ? 'Ocultar Productos' : 'Mostrar Productos'}
                    </button>
                  </div>
                  {productosVisibles[pedido.id] && (
                    <div className="pedido-productos">
                      <h3>Productos:</h3>
                      {Object.values(pedido.orderData).map((producto, index) =>
                        producto.nombre ? (
                          <div key={index} className="producto">
                            <p><strong>Nombre:</strong> {producto.nombre}</p>
                            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            <button
                              className="volver-a-comprar-btn"
                              onClick={() => handleVolverAComprar(producto)}
                            >
                              Volver a Comprar
                            </button>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sin Pedidos */}
        {pedidos.length === 0 && (
          <div className="sin-pedidos">
            <p>No tienes pedidos registrados.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmación para cancelar pedido */}
      {isCancelModalOpen && (
        <ModalMensaje
          titulo="Confirmación de Cancelación"
          mensaje={cancelMessage}
          onClose={closeCancelModal}
          onConfirm={handleCancelPedido}
        />
      )}

      {/* Modal de éxito */}
      {isSuccessModalOpen && (
        <ModalMensaje
          titulo="Cancelación Exitosa"
          mensaje="El pedido ha sido cancelado exitosamente."
          onClose={closeSuccessModal}
        />
      )}
      <Footer />
    </>
  );
};

export default MisPedidos;