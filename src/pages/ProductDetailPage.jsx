import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Space, Divider, Image } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';

const { Title, Paragraph, Text } = Typography;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { currentLanguage } = useLanguage();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct);
  }, [productId, products]);

  const renderMultilingualText = (textObj) => {
    if (typeof textObj === 'object' && textObj[currentLanguage]) {
      return textObj[currentLanguage];
    }
    return textObj;
  };

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
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mahsulot rasmlari */}
        <div>
          {product.images && product.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              <Image 
                src={product.images[0]} 
                alt={renderMultilingualText(product.name)} 
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.images.slice(1).map((image, index) => (
                <Image 
                  key={index} 
                  src={image} 
                  alt={`${renderMultilingualText(product.name)} - ${index + 2}`} 
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              <Text>Rasm mavjud emas</Text>
            </div>
          )}
        </div>

        {/* Mahsulot ma'lumotlari */}
        <div>
          <Title level={2}>{renderMultilingualText(product.name)}</Title>
          <Text strong className="text-2xl text-[#2189FF]">
            {product.price ? `${product.price.toLocaleString()} so'm` : 'Narx ko\'rsatilmagan'}
          </Text>

          <Divider />

          <Paragraph>{renderMultilingualText(product.description) || 'Mahsulot haqida batafsil ma\'lumot yo\'q'}</Paragraph>

          {product.features && product.features.length > 0 && (
            <>
              <Title level={4}>Xususiyatlari:</Title>
              <ul className="list-disc pl-5">
                {product.features.map((feature, index) => (
                  <li key={index}>{renderMultilingualText(feature)}</li>
                ))}
              </ul>
            </>
          )}

          <Divider />

          <Space>
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              size="large"
              onClick={handleAddToCart}
            >
              Savatga qo'shish
            </Button>
            <Button 
              icon={<HeartOutlined />} 
              size="large"
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
