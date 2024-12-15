import React, { useState, useEffect, useRef } from 'react';
import { Modal, notification, Carousel, Descriptions } from 'antd';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCheck, FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';

const ProductModal = ({ isOpen, onClose, product }) => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getLocalizedName, getLocalizedDescription } = useProducts();
  const [isAdded, setIsAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Ref for Carousel
  const carouselRef = useRef(null);

  useEffect(() => {
    if (product && cartItems) {
      const productInCart = cartItems.find((item) => item.id === product.id);
      setIsInCart(!!productInCart);
    }
  }, [product, cartItems]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (isInCart) {
      notification.warning({
        message: t('already_in_cart_title'),
        description: t('already_in_cart_desc'),
        placement: 'top',
        duration: 3,
      });
      return;
    }

    addToCart(product);
    setIsAdded(true);
    setIsInCart(true);

    notification.success({
      message: t('added_to_cart_title'),
      description: t('added_to_cart_desc'),
      placement: 'top',
      duration: 2,
    });

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  const productImages =
    product.images && product.images.length > 0
      ? product.images.map((image, index) => (
        <div key={index} className="h-[200px] md:h-[400px] w-[90%] md:w-full flex items-center rounded-lg justify-center">
          <img src={image} className="h-full w-full object-contain  rounded-lg" />
        </div>
      ))
      : 'https://via.placeholder.com/400x400.png?text=No+Image';

  const localizedName = getLocalizedName(product);
  const localizedDescription = getLocalizedDescription(product);

  return (
    <Modal
      // title={localizedName}
      open={isOpen}
      onCancel={onClose}
      cancelButtonProps={{
        style: { backgroundColor: 'red', color: 'white' },
      }}
      footer={null}
      width={900}
      className="product-modal"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2">
          <Carousel
            ref={carouselRef}
            dotPosition="bottom"
            autoplay
          >
            {productImages}
          </Carousel>
          {product.images && product.images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                onClick={() => carouselRef.current?.prev()}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                onClick={() => carouselRef.current?.next()}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#0B2441]">{localizedName}</h2>
          <p className="text-xl font-semibold text-[#2189FF]">
            {product.price.toLocaleString()} so'm
          </p>

          <Descriptions column={1}>
            {product.color && (
              <Descriptions.Item label="Rang">{product.color || "Rang ma'lumot mavjud emas."}</Descriptions.Item>
            )}
            {product.size && (
              <Descriptions.Item label="O'lcham">{product.size || "O'lcham ma'lumot mavjud emas."}</Descriptions.Item>
            )}
            {product.material && (
              <Descriptions.Item label="Material">
                {product.material || "Material ma'lumot mavjud emas."}
              </Descriptions.Item>
            )}
            {product.brand && (
              <Descriptions.Item label="Brend">{product.brand || "Brend ma'lumot mavjud emas."}</Descriptions.Item>
            )}
          </Descriptions>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#0B2441]">Mahsulot haqida:</h3>
            <p className="text-gray-600">
              {product.description || localizedDescription || 'Mahsulot haqida ma\'lumot mavjud emas.'}
            </p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#0B2441]">Xususiyatlari:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`flex-1 py-2 px-4 md:py-3 md:px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${isInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2189FF] hover:bg-[#1a6ecc]'
                } text-white`}
            >
              {isAdded ? (
                <>
                  <FaCheck className="text-xl" />
                  {t('added_to_cart')}
                </>
              ) : isInCart ? (
                <>
                  <FaCheck className="text-xl" />
                  {t('already_in_cart')}
                </>
              ) : (
                <>
                  <FaPlus className="text-xl" />
                  {t('add_to_cart')}
                </>
              )}
            </button>
            <button
              onClick={handleGoToCart}
              className="flex-1 bg-[#0B2441] text-white py-2 px-4 md:py-3 md:px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0a1c32] transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              {t('go_to_cart')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
