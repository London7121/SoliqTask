import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaShoppingCart, FaEye } from "react-icons/fa";
import maishiy_tex from '../data/maishiyTex';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductModal from '../components/ProductModal';
import { notification } from 'antd';

export default function MaishiyTex() {
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddToCart = (product) => {
        const formattedProduct = {
            ...product,
            name: product.title,
            price: parseInt(product.job_name.replace(/[^\d]/g, '')),
            image: product.img,
            description: product.title,
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
            name: product.title,
            price: parseInt(product.job_name.replace(/[^\d]/g, '')),
            image: product.img,
            description: product.title,
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
        const nextIndex = (currentIndex + 1) % 1; // MaishiyTex uchun faqat bitta rasm
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
            <div id="maishiy" className="my-16 h-auto py-2">
                <div data-aos="fade-up" className='flex flex-col lg:flex-row items-center justify-between gap-3'>
                    <div className='flex flex-col items-start gap-4'>
                        <p className='text-[28px] font-bold text-[#0B2441]'>Maishiy texnika</p>
                        <p className='text-[16px] font-normal text-[#64748B]'>Barcha mahsulotlar</p>
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
                    {maishiy_tex.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group relative transform transition-transform duration-300 hover:scale-105"
                        >
                            <div 
                                className="relative h-48 overflow-hidden"
                                onClick={() => handleProductClick(product)}
                            >
                                <img
                                    src={product.img}
                                    alt={product.title}
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
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-[#0B2441]">{product.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#2189FF] font-bold">{product.job_name}</span>
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
    )
}
