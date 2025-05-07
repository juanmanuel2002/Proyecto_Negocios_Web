import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClipLoader } from 'react-spinners';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchProductos } from '../services/api';
import ScrollToTopButton from '../components/ScrollTopButton';
import '../styles/Main.css';
import '../styles/Tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [selectedQuantityProduct, setSelectedQuantityProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const { addToCart, clearCart } = useCart(); // Agregamos clearCart para limpiar el carrito
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const obtenerProductos = async () => {
      const result = await fetchProductos();
      if (result.success) {
        setProductos(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    obtenerProductos();
  }, []);

  const handleAgregarCarrito = (producto) => {
    setSelectedQuantityProduct(producto);
    setQuantity(1);
    setIsQuantityModalOpen(true);
  };

  const handleBuyNow = (producto) => {
    setSelectedQuantityProduct(producto);
    setQuantity(1);
    setIsQuantityModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    if (quantity > selectedQuantityProduct.unidadesDisponibles) {
      alert(
        `No puedes comprar más unidades de "${selectedQuantityProduct.nombre}". Solo hay ${selectedQuantityProduct.unidadesDisponibles} disponibles.`
      );
      return;
    }

    // Limpiar el carrito y agregar solo el producto seleccionado
    clearCart();
    addToCart({
      ...selectedQuantityProduct,
      cantidad: quantity,
    });

    if (isLoggedIn) {
      navigate('/paypal'); // Redirige a PayPal si el usuario está logueado
    } else {
      setShowMessage(true);
      setTimeout(() => {
        navigate('/login'); // Redirige a la página de inicio de sesión si no está logueado
      }, 3000);
    }

    setIsQuantityModalOpen(false);
    setSelectedQuantityProduct(null);
  };

  const increaseQuantity = () => {
    if (quantity < selectedQuantityProduct.unidadesDisponibles) {
      setQuantity((prev) => prev + 1);
    } else {
      alert(
        `No puedes agregar más unidades de "${selectedQuantityProduct.nombre}". Solo hay ${selectedQuantityProduct.unidadesDisponibles} disponibles.`
      );
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleImageClick = (producto) => {
    const folderPath = `/imagenes/Galeria/${producto.nombre}`;
    const images = [
      `${folderPath}/imagen1.jpg`,
      `${folderPath}/imagen2.jpg`,
      `${folderPath}/imagen3.jpg`,
    ];

    setSelectedProduct(producto);
    setGalleryImages(images);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setGalleryImages([]);
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="main-container">
      <Header />
      <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>
      <h1 data-aos="fade-up" className="titulo-tienda">Nuestros Productos</h1>
      {loading ? (
        <p className="loading"><ClipLoader color="#6d4c41" size={50} /></p>
      ) : error ? (
        <p className="error">Ha ocurrido un error al obtener los productos</p>
      ) : (
        <div className="productos-grid" data-aos="fade-up">
          {productos.map((producto) => (
            <div className="card-producto" key={producto.id}>
              <img
                src={`imagenes/Galeria/${producto.imagen}`}
                alt={producto.nombre}
                onClick={() => handleImageClick(producto)}
                className="producto-imagen"
              />
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              <p className="precio">${producto.precio}</p>
              <div className="botones-producto">
                <button onClick={() => handleAgregarCarrito(producto)}>
                  Agregar al carrito
                </button>
                <button onClick={() => handleBuyNow(producto)}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal galería de imágenes */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.nombre}</h2>
            <div className="gallery-large">
              <button className="prev-button" onClick={handlePrevImage}>⬅</button>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${selectedProduct.nombre} ${currentImageIndex + 1}`}
                className="gallery-large-image"
              />
              <button className="next-button" onClick={handleNextImage}>➡</button>
            </div>
            <button className="close-modal" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal selección de cantidad */}
      {isQuantityModalOpen && (
        <div className="modal-overlay" onClick={() => setIsQuantityModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedQuantityProduct?.nombre}</h3>
            <p>¿Cuántas unidades deseas comprar?</p>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button onClick={handleConfirmPurchase} className="confirm-button">
              Comprar {quantity} unidades
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de inicio de sesión */}
      {showMessage && (
        <div className="login-message">
          <p>Es necesario iniciar sesión para continuar con la compra. Redirigiendo...</p>
        </div>
      )}

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Tienda;