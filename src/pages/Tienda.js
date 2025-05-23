import React, { useState, useEffect } from 'react';
import FilterDropdown from '../components/FilterDropdown';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchProductos, scrapePrices } from '../services/api'; 
import ScrollToTopButton from '../components/ScrollTopButton';
import ModalMensaje from '../components/ModalMensaje'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Main.css';
import '../styles/Tienda.css';
import DireccionControl from '../components/DireccionControl';
import { useDireccionControl } from '../utils/useDireccionControl';

/*TODO: -Implementar filtro por categoria de producto
        -Añadir categoria al buscador de scrapping 


*/
const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [actionType, setActionType] = useState('');

  const [comparisonResults, setComparisonResults] = useState([]); 
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false); 
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false); 
  const [validationMessage, setValidationMessage] = useState(''); 

  //eslint-disable-next-line
  const [isComparing, setIsComparing] = useState(false);

  const { addToCart, clearCart, cartItems } = useCart();
  const { isLoggedIn, currentUser, setRedirectPath } = useAuth();
  const navigate = useNavigate();

  const [isLoadingComparison, setIsLoadingComparison] = useState(false); 
  const [isStockModalOpen, setIsStockModalOpen] = useState(false); 
  const [stockMessage, setStockMessage] = useState(''); 

  const {
    showDireccionControl,
    abrirDireccionControl,
    cerrarDireccionControl,
  } = useDireccionControl();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });

    const obtenerProductos = async () => {
      const result = await fetchProductos();
      if (result.success) {
        setProductos(result.data);
        setFilteredProductos(result.data); 
        //Obtiene la lista de categorías
        const cats = Array.from(new Set(result.data.map(p => p.categoria)));
        setCategories(cats);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    obtenerProductos();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term,selectedCategories);
  
  };

  const handleCategoriesChange = categories => {
    setSelectedCategories(categories);
    filterProducts(searchTerm, categories);
  };


  //Funcion auxiliar para aplicar la busqueda y el cambio
  const filterProducts = (term,categories) => {
    let resultado = productos;
    if (term){
      resultado = resultado.filter (p =>
        p.nombre?.toLowerCase().includes(term)
      );
    }

    //Filtrado por categorias multiples
    if(categories.length > 0){
      resultado = resultado.filter(p => 
        categories.includes(p.categoria)
      );
    }

    setFilteredProductos(resultado);
  };


  const handleComparePrices = async (producto) => {
    setIsLoadingComparison(true); 
    setIsComparisonModalOpen(true); 
    setSelectedProduct(producto);

    const result = await scrapePrices(producto.nombre); 
    if (result.success) {
        setComparisonResults(result.data); 
    } else {
        console.error(result.message);
        setComparisonResults([]); 
    }

    setIsLoadingComparison(false); 
  };

  const handleAgregarCarrito = (producto) => {
    const productoEnCarrito = cartItems.find((item) => item.id === producto.id);
    const cantidadTotal = (productoEnCarrito?.cantidad || 0) + 1;

    if (cantidadTotal > producto.unidadesDisponibles) {
      setStockMessage(
        `No puedes agregar más unidades de "${producto.nombre}". Solo hay ${producto.unidadesDisponibles} disponibles en total.`
      );
      setIsStockModalOpen(true); 
      return;
    }
    const tieneSuscripcion = cartItems.some((item) => item.nombre.includes('Suscripción'));

    if (tieneSuscripcion) {
      setValidationMessage('No puedes agregar productos si ya tienes una suscripción en el carrito. Elimina la suscripcion para poder agregar los productos al carrito');
      setIsValidationModalOpen(true);
      return;
    }
    setSelectedQuantityProduct(producto);
    setQuantity(1);
    setActionType('addToCart');
    setIsQuantityModalOpen(true);
  };

  const handleBuyNow = (producto) => {
    const tieneSuscripcion = cartItems.some((item) => item.nombre.includes('Suscripción'));

    if (tieneSuscripcion) {
      setValidationMessage('No puedes comprar productos si ya tienes una suscripción en el carrito. Elimina la suscripcion para poder comprar los productos');
      setIsValidationModalOpen(true);
      return;
    }
    setSelectedQuantityProduct(producto);
    setQuantity(1);
    setActionType('buyNow');
    setIsQuantityModalOpen(true);
  };

  const handleConfirmQuantity = () => {
    if (quantity > selectedQuantityProduct.unidadesDisponibles) {
      setStockMessage(
        `No puedes agregar más unidades de "${selectedQuantityProduct.nombre}". Solo hay ${selectedQuantityProduct.unidadesDisponibles} disponibles.`
      );
      setIsStockModalOpen(true); 
      return;
    }

    if (actionType === 'addToCart') {
      addToCart({
        ...selectedQuantityProduct,
        cantidad: quantity,
      });
      setIsQuantityModalOpen(false);
      setSelectedQuantityProduct(null);
    } else if (actionType === 'buyNow') {
      setRedirectPath('/paypal');
      clearCart();
      addToCart({
        ...selectedQuantityProduct,
        cantidad: quantity,
      });

      if (isLoggedIn) {
        abrirDireccionControl();
      } else {
        setShowMessage(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }

      setIsQuantityModalOpen(false);
      setSelectedQuantityProduct(null);
    }
  };

  const handleDireccionConfirmada = () => {
    cerrarDireccionControl(); 
    navigate('/paypal', { state: { from: '/tienda' } });
  };

  const increaseQuantity = () => {
    if (quantity < selectedQuantityProduct.unidadesDisponibles) {
      setQuantity((prev) => prev + 1);
    } else {
      setStockMessage(
        `No puedes agregar más unidades de "${selectedQuantityProduct.nombre}". Solo hay ${selectedQuantityProduct.unidadesDisponibles} disponibles.`
      );
      setIsStockModalOpen(true); 
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // eslint-disable-next-line
  const handleImageClick = (producto) => {
    const folderPath = `/imagenes/products/${producto.categoria}/${producto.imagen}`;
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

  const closeValidationModal = () => {
    setIsValidationModalOpen(false);
    setValidationMessage('');
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
     
      {/* Campo de búsqueda */}
      <div className="search-container" data-aos="fade-up">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <FilterDropdown
          options={categories}
          selected={selectedCategories}
          onChange={handleCategoriesChange}
        />


      </div>
      {/* <p className="leyenda-fotos" data-aos="fade-up">
        Selecciona la foto del producto para ver más fotos.
      </p> */}
      {loading ? (
        <p className="loading">
          <i className="fas fa-spinner fa-spin-pulse fa-3x"></i>
        </p>
      ) : error ? (
        <p className="error">Ha ocurrido un error al obtener los productos</p>
      ) : (
        filteredProductos.length === 0 ? (
          <p className="no-results">
            No se encontraron coincidencias con los criterios seleccionados
          </p>
        ) : (
        <div className="productos-grid" data-aos="fade-up">
          {filteredProductos.map((producto) => (
            <div className="card-producto" key={producto.id}>
              <img
                src={`imagenes/products/${producto.categoria}/${producto.imagen}`}
                alt={producto.nombre}
                 //onClick={() => handleImageClick(producto)} Comentado porque por ahora es una imagen por producto
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
                <button onClick={() => handleComparePrices(producto)}>
                  {isComparing ? 'Comparando...' : 'Comparar Precios'}
                </button>
              </div>
            </div>
          ))}
        </div>
        )
      )}

      {/* Modal de validación */}
      {isValidationModalOpen && (
        <ModalMensaje
          titulo=""
          mensaje={validationMessage}
          onClose={closeValidationModal}
        />
      )}

      {/* Modal de galería de imágenes */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct?.nombre}</h2>
            <div className="gallery-large">
              <button className="prev-button" onClick={handlePrevImage}>⬅</button>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`${selectedProduct?.nombre} ${currentImageIndex + 1}`}
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
            <p>¿Cuántas unidades deseas agregar?</p>
            <div className="quantity-controls">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button onClick={handleConfirmQuantity} className="confirm-button">
              {actionType === 'addToCart' ? 'Agregar al carrito' : 'Comprar'} {quantity} unidades
            </button>
          </div>
        </div>
      )}

      {/* Modal para el mensaje de inicio de sesión */}
      {showMessage && (
        <ModalMensaje
          titulo="Inicio de Sesión Requerido"
          mensaje="Es necesario iniciar sesión para continuar con la compra. Redirigiendo..."
          onClose={() => setShowMessage(false)}
        />
      )}

      {/* Modal para mostrar resultados de comparación */}
      {isComparisonModalOpen && (
        <div className="modal-overlay" onClick={() => setIsComparisonModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Botón para cerrar el modal */}
            <button className="close-modal-button" onClick={() => setIsComparisonModalOpen(false)}>
              ✖
            </button>
            <h3>Comparación con productos similares de la Europea</h3>
            {isLoadingComparison ? (
              <p>Trabajando en obtener los productos...</p>
            ) : comparisonResults.length > 0 ? (
              <>
                
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Nuestro precio</th>
                      <th>Precio La Europea</th>
                      <th>Enlace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.name}</td>
                        <td>
                          {selectedProduct ? `$${selectedProduct.precio}` : 'N/A'}
                        </td>
                        <td>{result.price}</td>
                        <td>
                          <a href={result.link} target="_blank" rel="noopener noreferrer">
                            Ver Producto
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>No se encontraron resultados.</p>
            )}
            <button className="close-modal" onClick={() => setIsComparisonModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de validación de stock */}
      {isStockModalOpen && (
        <ModalMensaje
          titulo="Stock Insuficiente"
          mensaje={stockMessage}
          onClose={() => setIsStockModalOpen(false)}
        />
      )}

      {/* Control de dirección antes de ir a Paypal */}
      {showDireccionControl && isLoggedIn && currentUser && (
        <DireccionControl userId={currentUser.uid} 
        onDireccionConfirmada={handleDireccionConfirmada} />
      )}

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Tienda;