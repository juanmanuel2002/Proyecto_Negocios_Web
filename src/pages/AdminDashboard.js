import React, { useEffect, useState } from 'react';
import { fetchAdminDashboard, fetchProductos } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAdminDashboard();
      if (result.success) {
        setDashboardData(result.data.data);
      } else {
        setError(result.message || 'Error al cargar los datos del dashboard.');
      }
      setLoading(false);
    };

    const fetchStock = async () => {
      try {
        const res = await fetchProductos();
        if (res.success) {
          setProductos(res.data);
        }
      } catch (e) {}
      setLoadingProductos(false);
    };

    fetchData();
    fetchStock();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <p>Cargando datos del dashboard...</p>
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

  return (
    <>
      <Header />
      <div className="admin-dashboard-container">
        <h1>Dashboard de Administrador</h1>
        <div className="dashboard-summary">
          <p><strong>Total de Usuarios:</strong> {dashboardData.totalUsers}</p>
          <p><strong>Total de Pedidos:</strong> {dashboardData.totalOrders}</p>
        </div>
        <div className="dashboard-flex">
          <div className="dashboard-left">
            <h2>Pedidos Recientes</h2>
            {dashboardData.recentOrders && dashboardData.recentOrders.length > 0 ? (
              <ul className="recent-orders-list">
                {dashboardData.recentOrders.map((order) => (
                  <li key={order.id} className="order-card">
                    <p><strong>ID del Pedido:</strong> {order.id}</p>
                    <p><strong>Fecha:</strong> {new Date(order.creado).toLocaleString()}</p>
                    <p><strong>Estado:</strong> {order.estado}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <h3>Productos:</h3>
                    <ul>
                      {order.orderData.map((product, index) => (
                        <li key={index}>
                          <p><strong>Nombre:</strong> {product.nombre}</p>
                          <p><strong>Cantidad:</strong> {product.cantidad}</p>
                          <p><strong>Precio:</strong> ${product.precio}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay pedidos recientes.</p>
            )}
          </div>
          <div className="dashboard-right">
            <h2>Stock de Productos</h2>
            {loadingProductos ? (
              <p>Cargando stock de productos...</p>
            ) : (
              <table className="stock-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Stock Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto._id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.unidadesDisponibles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;