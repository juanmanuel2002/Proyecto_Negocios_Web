import React from 'react';

const Carousel = ({ items, renderItem }) => {
    return (
        <div className="carousel-wrapper" data-aos="fade-up">
            <div className="carousel-track">
                {items.map((item, idx) => (
                    <div className="carousel-item" key={idx}>
                        {renderItem(item, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;