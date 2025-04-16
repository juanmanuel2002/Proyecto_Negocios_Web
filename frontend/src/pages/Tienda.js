import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ClipLoader } from 'react-spinners';
import { useCart } from '../context/CartContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchProductos } from '../services/api';
import '../styles/Main.css';
import '../styles/Tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [galleryImages, setGalleryImages] = useState([]); // Imágenes de la galería
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice de la imagen actual

  const { addToCart } = useCart();

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
    addToCart(producto); // Agrega el producto al carrito
  };

  const handleImageClick = (producto) => {
    const folderPath = `/imagenes/Galeria/${producto.nombre}`; // Ruta de la carpeta del producto

    // Simula la carga de imágenes (en producción, podrías usar una API o un método más dinámico)
    const images = [
      `${folderPath}/imagen1.jpg`,
      `${folderPath}/imagen2.jpg`,
      `${folderPath}/imagen3.jpg`,
    ];

    setSelectedProduct(producto);
    setGalleryImages(images);
    setCurrentImageIndex(0); // Reinicia el índice al abrir el modal
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
                <button onClick={() => alert(`Has comprado: ${producto.nombre}`)}>
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
      <Footer />
    </div>
  );
};

export default Tienda;