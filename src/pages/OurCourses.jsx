import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft, FaShoppingCart, FaEye } from "react-icons/fa";
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductModal from '../components/ProductModal';
import { notification } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';

// Multilingual tekshirish uchun yordam funktsiya
const renderMultilingualText = (textObj) => {
  // Agar textObj string bo'lsa, uni qaytaramiz
  if (typeof textObj === 'string') return textObj;
  
  // Agar textObj ob'ekt bo'lsa va uz yoki ru kaliti bo'lsa
  if (typeof textObj === 'object' && textObj !== null) {
    return textObj.uz || textObj.ru || '';
  }
  
  // Agar hech qanday ma'lumot bo'lmasa, bo'sh string qaytaramiz
  return '';
};

export default function OurCourses() {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();
    const { products } = useProducts();
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        Aos.init();
    }, []);

    const handleAddToCart = (product) => {
        const formattedProduct = {
            ...product,
            name: renderMultilingualText(product.name),
            features: [t('quality'), t('price'), t('delivery')]
        };
        
        addToCart(formattedProduct);
        notification.success({
            message: t('added_to_cart_title'),
            description: `${renderMultilingualText(product.name)} ${t('added_to_cart_desc')}`,
            placement: 'topRight',
        });
    };

    const handleProductClick = (product) => {
        const formattedProduct = {
            ...product,
            name: renderMultilingualText(product.name),
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
        const currentIndex = currentImageIndex[productId] || 0;
        const nextIndex = (currentIndex + 1) % (selectedProduct?.images?.length || 1);
        setCurrentImageIndex(prev => ({ ...prev, [productId]: nextIndex }));
    };

    const handlePrevImage = (productId, e) => {
        e.stopPropagation();
        const currentIndex = currentImageIndex[productId] || 0;
        const prevIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        setCurrentImageIndex(prev => ({ ...prev, [productId]: prevIndex }));
    };

    return (
        <div>
            <div id="ourCourses" className="my-16 h-auto py-2">
                <div data-aos="fade-up" className='flex flex-col lg:flex-row items-center justify-between gap-3'>
                    <div className='flex flex-col items-start gap-4'>
                        <p className='text-[28px] font-bold text-[#0B2441]'>{t('our_products')}</p>
                        <p className='text-[16px] font-normal text-[#64748B]'>Power.uz - {t('quality').toLowerCase()}</p>
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

                {/* Products Grid */}
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
                                <img
                                    src={product.images[0]}
                                    alt={renderMultilingualText(product.name)}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProductClick(product);
                                        }}
                                        className="bg-white p-2 rounded-full shadow-md"
                                    >
                                        <FaEye className="text-[#2189FF]" />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        className="bg-white p-2 rounded-full shadow-md"
                                    >
                                        <FaShoppingCart className="text-[#0B2441]" />
                                    </button>
                                </div>
                            </div>
                            <div 
                                className="p-4"
                                onClick={() => handleProductClick(product)}
                            >
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-[#0B2441]">
                                    {renderMultilingualText(product.name)}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2189FF] font-bold">{product.price.toLocaleString()} so'm</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProduct && (
                    <ProductModal 
                        isOpen={isModalVisible} 
                        onClose={handleCloseModal} 
                        product={selectedProduct}
                    />
                )}
            </div>
        </div>
    );
}
