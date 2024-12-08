import React from 'react';
import { Carousel } from 'antd';

const ProductSlider = ({ product }) => {
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/300x300.png?text=No+Image'];

  return (
    <Carousel dotPosition="bottom" autoplay>
      {images.map((image, index) => (
        <div key={index} className="h-[300px] flex items-center justify-center">
          <img 
            src={image} 
            alt={`${product.title} - ${index + 1}`} 
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductSlider;
