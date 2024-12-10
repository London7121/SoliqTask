import React, { useState } from 'react';
import { Row, Col, Button, Drawer, Badge, notification } from 'antd';
import { FaArrowLeft, FaArrowRight, FaEye, FaShoppingCart } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductModal from '../components/ProductModal';
// import { Faqat } from '../components';
import {ayollar} from '../data/JS/ayollar';

const Ayollar = ({ onProductClick }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const products = ayollar;

  const handleAddToCart = (product) => {
    const formattedProduct = {
      ...product,
      name: product.name,
      price: product.price,
      image: product.images,
      description: product.description,
      features: [t('quality'), t('price'), t('delivery')]
    };
    
    addToCart(formattedProduct);
    notification.success({
      message: t('added_to_cart_title'),
      description: `${formattedProduct.name} ${t('added_to_cart_desc')}`,
      placement: 'topRight',
    });
  };

  const handleProductClick = (product) => {
    const formattedProduct = {
      ...product,
      name: product.name,
      price: product.price,
      image: product.images,
      description: product.description,
      features: [t('quality'), t('price'), t('delivery')]
    };
    
    setSelectedProduct(formattedProduct);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleNextImage = (productId, e) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    const currentIndex = currentImageIndex[productId] || 0;
    const nextIndex = (currentIndex + 1) % (product.images?.length || 1);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: nextIndex }));
  };

  const handlePrevImage = (productId, e) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    const currentIndex = currentImageIndex[productId] || 0;
    const prevIndex = currentIndex === 0 ? (product.images?.length - 1 || 0) : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [productId]: prevIndex }));
  };

  return (
    <div className="container mx-auto px-4 py-8 my-16">
      <div className=" h-auto py-2">
        <div data-aos="fade-up" className='flex flex-col lg:flex-row items-center justify-between gap-3'>
          <div className='flex flex-col items-start gap-4'>
            <p className='text-[28px] font-bold text-[#0B2441] dark:text-white'>Ayollar uchun</p>
            <p className='text-[16px] font-normal text-[#64748B] '>{t('all_products')}</p>
          </div>
          <div className='flex items-center gap-3'>
            <button className='w-[45px] h-[45px] rounded-[16px] bg-[#EAF4FF] flex items-center justify-center'>
              <FaArrowLeft className='text-[20px] text-[#2189FF]' />
            </button>
            <button className='w-[45px] h-[45px] rounded-[16px] bg-[#EAF4FF] flex items-center justify-center'>
              <FaArrowRight className='text-[20px] text-[#2189FF]' />
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">{t('no_products_in_category')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group relative transform transition-transform duration-300 hover:scale-105"
              >
                <div 
                  className="relative h-48 overflow-hidden"
                  onClick={() => handleProductClick(product)}
                >
                  {product.images && product.images.length > 1 && (
                    <div className="absolute z-10 top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2">
                      <button 
                        onClick={(e) => handlePrevImage(product.id, e)}
                        className="bg-white/50 p-1 rounded-full"
                      >
                        <FaArrowLeft className="text-[#0B2441]" />
                      </button>
                      <button 
                        onClick={(e) => handleNextImage(product.id, e)}
                        className="bg-white/50 p-1 rounded-full"
                      >
                        <FaArrowRight className="text-[#0B2441]" />
                      </button>
                    </div>
                  )}
                  <img
                    src={product.images?.[currentImageIndex[product.id] || 0] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => onProductClick(product)}
                      className="bg-white p-2 rounded-full shadow-md"
                    >
                      <FaEye className="text-[#0B2441]" />
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full shadow-md"
                    >
                      <FaShoppingCart className="text-[#0B2441]" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#0B2441] truncate">{product.name}</h3>
                  <p className="text-[#2189FF] font-bold">
                    {product.price ? `${product.price.toLocaleString()} so'm` : 'Narx ko\'rsatilmagan'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          visible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Ayollar;
