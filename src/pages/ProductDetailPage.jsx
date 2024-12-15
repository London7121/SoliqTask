import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Space, Divider, Image } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    setProduct(foundProduct);
  }, [productId, getProductById]);

  if (!product) {
    return (
      <div className="text-center py-16">
        <Title level={2}>Mahsulot topilmadi</Title>
        <Paragraph>Kechirasiz, so'ralgan mahsulot bazada mavjud emas.</Paragraph>
        <Button type="primary" onClick={() => window.history.back()}>
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mahsulot rasmlari */}
        <div className="flex justify-center mb-4 md:mb-0">
          {product.images || product.img ? (
            <div className="flex items-center justify-center w-[80%] md:w-full gap-2 rounded-lg">
              <Image
                src={product.img || product.images[0]}
                alt={product.name}
                className="object-cover shadow rounded-lg w-full h-full"
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              <Image
                src="https://via.placeholder.com/300x300.png?text=No+Image"
                alt={product.name}
                className="object-cover shadow rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Mahsulot ma'lumotlari */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-[#0B2441] dark:text-white text-center md:text-left">{product.title}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-[#2189FF] dark:text-white">
              {product.price ? `${product.price} so'm` : "Narx ko'rsatilmagan"}
            </span>
          </div>

          <Divider />

          <Paragraph className="dark:text-gray-300 text-center md:text-left">
            {product.title || product.description || 'Mahsulot haqida batafsil ma\'lumot yo\'q'}
          </Paragraph>

          <Divider />

          <Space className="flex justify-center gap-4">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
            >
              Savatga qo\'shish
            </Button>
            <Button
              icon={<HeartOutlined />}
              className="text-red-500"
            >
              Sevimlilar
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
