import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../asserts/logo.jpg';
import Carousel from '../components/Carousel';
import MysteryBoxCard from '../components/MysteryBoxCards';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollTopButton';
import '../styles/Global.css';
import '../styles/Main.css';
import { FaCrown, FaGift, FaBoxOpen, FaStar } from 'react-icons/fa'; 
import { handleSearchTweets } from '../services/api';
import TweetList from '../components/TweetList';

const Main = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    const navigate = useNavigate();

    const [tweetIds, setTweetIds] = useState([]);
    const [setLoadingTweets] = useState(false);

    const images = [
        '/imagenes/Galeria/cafe.jpg',
        '/imagenes/Galeria/cerveza.jpg',
        '/imagenes/Galeria/mezcal.jpg',
        '/imagenes/Galeria/regalo.jpg',
        '/imagenes/Galeria/articulos.jpg',
        '/imagenes/Galeria/vino_chocolate.jpg'
    ];

    const testimonios = [
        {
          texto: "¡Una experiencia increíble! Cada caja es una sorpresa deliciosa.",
          autor: "Carla M.",
          calificacion: "⭐⭐⭐⭐⭐"
        },
        {
          texto: "Me encanta descubrir nuevos productos cada mes.",
          autor: "Luis R.",
          calificacion: "⭐⭐⭐⭐"
        },
        {
          texto: "Sabores Ocultos ha cambiado la forma en la que disfruto mis snacks.",
          autor: "Fernanda G.",
          calificacion: "⭐⭐⭐⭐"
        },
        {
          texto: "¡Excelente atención y productos de calidad!",
          autor: "David P.",
          calificacion: "⭐⭐⭐⭐⭐"
        }
    ];

    // Función para buscar tweets
    const fetchTweets = async (query) => {
        setLoadingTweets(true);
        try {
            const tweets = await handleSearchTweets(query);
            const ids = tweets.map((tweet) => tweet.id); // Extraer los IDs de los tweets
            setTweetIds(ids);
        } catch (error) {
            console.error('Error al obtener tweets:', error);
        } finally {
            setLoadingTweets(false);
        }
    };

    useEffect(() => {
        fetchTweets('Mystery Box');
        // eslint-disable-next-line
    }, []);

    return (
        <div className="main-container">
            {/* Banner */}
            <Header />
            <div data-aos="fade-up" className="center-title">Sabores Ocultos</div>

            {/* Bloque de la pregunta + imagen */}
            <div className="pregunta-banner" data-aos="fade-up">
                <div className="overlay-text" data-aos="fade-up">
                    <h2 data-aos="fade-up">¿Estás listo para abrir una caja llena de sabor y misterio?</h2>
                </div>
            </div>

            {/* Logo + descripción */}
            <div className="about-box" data-aos="zoom-in">
                <div className="logo-circle">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="description">
                    <p>
                        Nuestra Mystery Box es una experiencia única que lleva lo mejor de los productos artesanales y gourmet del país directamente a las manos de los consumidores. Es una caja con una selección exclusiva de vino, mezcales, cafés, chocolates, cervezas y más, cuidadosamente elegidos para sorprender y deleitar, mientras conectan con las historias y tradiciones de los productores locales.
                    </p>
                </div>
            </div>

            {/* Carrusel de imágenes */}
            <Carousel
                items={images}
                renderItem={(image, idx) => <img src={image} alt={`Imagen ${idx + 1}`} />}
            />

            {/* Definición de mystery box */}
            <div className="mystery-box-section" data-aos="fade-up">
                <div className="mystery-box-content">
                    {/* Columna Izquierda */}
                    <div className="mystery-box-text">
                        <h2>¿Qué son las mystery boxes?</h2>
                        <p>
                            Nuestras mystery boxes son una selección única de productos exclusivos cuidadosamente elegidos para sorprenderte.
                            Descubre sabores auténticos y experiencias inolvidables.
                        </p>
                        <button onClick={() => navigate('/tienda')} className="descubre-btn">Descubre más</button>
                    </div>

                    {/* Columna Derecha - Cards */}
                    <div className="mystery-box-cards">
                        <MysteryBoxCard
                            icon={FaCrown}
                            title="Selección Premium"
                            description="Disfruta de productos seleccionados con altos estándares de calidad."
                        />
                        <MysteryBoxCard
                            icon={FaStar}
                            title="Sorpresa Garantizada"
                            description="Cada caja está pensada para brindarte una experiencia única e inesperada."
                        />
                        <MysteryBoxCard
                            icon={FaBoxOpen}
                            title="Ediciones Limitadas"
                            description="Productos que no encontrarás en ningún otro lugar, por tiempo limitado."
                            onClick={() => navigate('/tienda')}
                        />
                        <MysteryBoxCard
                            icon={FaGift}
                            title="Regalo Perfecto"
                            description="Ideal para compartir y sorprender a alguien especial."
                        />
                    </div>
                </div>
            </div>

            {/* Sección de Opiniones + Comunidad */}
            <div className="opiniones-comunidad">
                {/* Columna 1 - Opiniones */}
                <div className="opiniones" data-aos="fade-left">
                    <h2 className="seccion-titulo" data-aos="fade-up">Lo que opinan nuestros clientes</h2>
                    <div className="opiniones-grid">
                        {testimonios.map((testimonio, index) => (
                            <div className="opinion" key={index}>
                                <p>"{testimonio.texto}"</p>
                                <p>- {testimonio.autor}</p>
                                <p>{testimonio.calificacion}</p>
                            </div>
                        ))}
                    </div>
                </div>

                

                {/* Columna 2 - Comunidad */}
                <div className="comunidad" data-aos="fade-left">
                    <h2 className="seccion-titulo">Únete a nuestra comunidad</h2>
                    <p>Conviértete en parte de una comunidad que celebra la autenticidad, el sabor y el descubrimiento.</p>
                    <div className="logo-circle">
                        <img src={logo} alt="Logo" />
                    </div>
                    <button className="suscribirse-btn" onClick={() => navigate('/suscripciones')}>Suscríbete</button>
                </div>
            </div>

            {/* Mostrar tweets */}
            <div className="tweets-section" data-aos="fade-up">
                <h2 className="seccion-titulo">Lo que dicen en Twitter</h2>
                <div className="tweets-columns">
                    {/* Columna 1 */}
                    <div className="tweet-column">
                        {tweetIds[0] && <TweetList tweetIds={[tweetIds[0]]} />}
                    </div>

                    {/* Columna 2 */}
                    <div className="tweet-column">
                        {tweetIds[1] && <TweetList tweetIds={[tweetIds[1]]} />}
                    </div>

                    {/* Columna 3 */}
                    <div className="tweet-column">
                        {tweetIds[2] && <TweetList tweetIds={[tweetIds[2]]} />}
                    </div>
                </div>
            </div>

            <ScrollToTopButton />
            <Footer />
        </div>
    );
};

export default Main;