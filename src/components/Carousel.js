import React from 'react';
import '../styles/Carousel.css'

const Carousel = ({ images }) => (
  <div className="carousel-wrapper" data-aos="fade-up">
    <div className="carousel-track">
      {images.map((src, idx) => (
        <div className="carousel-item" key={idx}>
          <img
            src={src}
            alt={`Imagen ${idx + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Carousel;
