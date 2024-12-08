import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { notification } from 'antd';
import { useProducts } from '../context/ProductContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getLocalizedName } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    notification.success({
      message: 'Savatga qo\'shildi',
      description: `${getLocalizedName(product)} savatga qo'shildi`,
      placement: 'topRight',
    });
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % (product.images?.length || 1);
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const prevIndex = currentImageIndex === 0 
      ? (product.images?.length - 1 || 0) 
      : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group relative transform transition-transform duration-300 hover:scale-105"
      onClick={handleProductClick}
    >
      <div className="relative h-48 overflow-hidden">
        {product.images && product.images.length > 1 && (
          <div className="absolute z-10 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2">
            <button 
              onClick={handlePrevImage}
              className="bg-white/50 p-1 rounded-full"
            >
              <FaArrowLeft className="text-[#0B2441]" />
            </button>
            <button 
              onClick={handleNextImage}
              className="bg-white/50 p-1 rounded-full"
            >
              <FaArrowRight className="text-[#0B2441]" />
            </button>
          </div>
        )}
        <img
          src={product.img || product.images?.[currentImageIndex]}
          alt={getLocalizedName(product)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleProductClick}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <FaEye className="text-[#2189FF]" />
          </button>
          <button 
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow-md"
          >
            <FaShoppingCart className="text-[#0B2441]" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-[#0B2441]">
          {getLocalizedName(product)}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[#2189FF] font-bold">
            {product.price ? `${product.price.toLocaleString()} so'm` : 'Narx ko\'rsatilmagan'}
          </span>
          <button 
            type="primary" 
            onClick={handleProductClick}
          >
            Batafsil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
