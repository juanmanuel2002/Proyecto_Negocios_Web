import React from 'react';

const Carousel = ({ images }) => {
    return (
        <div className="carousel-wrapper" data-aos="fade-up">
            <div className="carousel-track">
                {images.map((img, idx) => (
                    <div className="carousel-item" key={idx}>
                        <img src={img} alt={`Galería ${idx + 1}`} />
                    </div>
                ))}
                {images.map((img, idx) => (
                    <div className="carousel-item" key={`copy-${idx}`}>
                        <img src={img} alt={`Galería ${idx + 1} (duplicado)`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;