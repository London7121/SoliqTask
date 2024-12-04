import React from 'react';
import { Modal } from 'antd';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
    navigate('/cart');
  };

  return (
    <Modal
      title={product.name}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#0B2441]">{product.name}</h2>
          <p className="text-xl font-semibold text-[#2189FF]">
            {product.price.toLocaleString()} so'm
          </p>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#0B2441]">Mahsulot haqida:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          {product.features && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#0B2441]">Xususiyatlari:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Savatga qo'shish
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
