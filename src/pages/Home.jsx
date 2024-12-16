import React, { useState } from 'react';
import { Row, Col, Button, Drawer, Badge, notification } from 'antd';
import { FileSearchOutlined, MenuOutlined } from '@ant-design/icons';
import { FaArrowLeft, FaArrowRight, FaEye, FaShoppingCart } from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../components/ProductModal';

const Home = () => {
  const { products, categories, getLocalizedName } = useProducts();

  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.categoryId === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    notification.success({
      message: t('added_to_cart_title'),
      description: `${getLocalizedName(product)} ${t('added_to_cart_desc')}`,
      placement: 'topRight',
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleNextImage = (productId, e) => {
    e.stopPropagation();
    const product = filteredProducts.find(p => p.id === productId);
    const currentIndex = currentImageIndex[productId] || 0;
    const nextIndex = (currentIndex + 1) % (product.images?.length || 1);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: nextIndex }));
  };

  const handlePrevImage = (productId, e) => {
    e.stopPropagation();
    const product = filteredProducts.find(p => p.id === productId);
    const currentIndex = currentImageIndex[productId] || 0;
    const prevIndex = currentIndex === 0 ? (product.images?.length - 1 || 0) : currentIndex - 1;
    setCurrentImageIndex(prev => ({ ...prev, [productId]: prevIndex }));
  };

  const handleProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderProductName = (product) => {
    if (typeof product.name === 'object') {
      return product.name[language] || product.name.uz || product.name.ru || '';
    }
    return String(product.name || '');
  };

  const CategoryPanel = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        type={selectedCategory === 'all' ? 'primary' : 'default'}
        onClick={() => setSelectedCategory('all')}
        className="flex items-center gap-2"
      >
        {t('all_categories')}
      </Button>
      <div className='flex flex-wrap gap-2'>
        {categories.map(category => (
          <div
            key={category.id}
            type={selectedCategory === category.id ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 w-[113px] h-[113px] md:w-[150px] md:h-[150px]  flex-col justify-between border border-gray-300 rounded-md cursor-pointer shadow-md hover:shadow-lg hover:border-[#2189FF] hover:transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img className='w-full h-[60px] md:h-[100px] object-cover p-1 rounded-t-md' src={category.icon} alt="icon" />
            <p className='mb-3 flex items-center gap-2 justify-center text-[12px] md:text-[16px] px-2'>
              {category.name?.[language] || category.name}
              <Badge
                count={products.filter(p => p.categoryId === category.id).length}
                style={{ backgroundColor: '#52c41a' }}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const CategoryDrawer = () => (
    <Drawer
      title={t('categories')}
      placement="left"
      width={250}
      onClose={() => setDrawerVisible(!drawerVisible)}
      open={drawerVisible}
    >
      <div className="flex flex-col gap-2">
        <Button
          type={selectedCategory === 'all' ? 'primary' : 'default'}
          onClick={() => {
            setSelectedCategory('all');
            setDrawerVisible(false);
          }}
          className="flex items-center gap-2 w-full"
        >
          {t('all_categories')}
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            type={selectedCategory === category.id ? 'primary' : 'default'}
            onClick={() => {
              setSelectedCategory(category.id);
              setDrawerVisible(false);
            }}
            className="flex items-center gap-2 w-full"
          >
            {/* {category.icon}  */}
            {category.name?.[language] || category.name}
            <Badge
              count={products.filter(p => p.categoryId === category.id).length}
              style={{ backgroundColor: '#52c41a' }}
            />
          </Button>
        ))}
      </div>
    </Drawer>
  );

  const AboutSection = () => (
    <div id="about" className="container mx-auto px-4 py-16 bg-gray-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="text-center mb-12 dark:text-white">
        <h2 className="text-4xl font-bold text-[#0B2441] mb-4 dark:text-blue-600">
          {t('about_us_title')}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-white">
          {t('about_us_description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-3xl font-semibold text-[#2189FF] mb-6">
            {t('our_mission')}
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-400">
            {t('mission_description')}
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-[#2189FF] mb-6">
            {t('our_values')}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center dark:text-gray-400">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_1')}
            </li>
            <li className="flex items-center dark:text-gray-400">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_2')}
            </li>
            <li className="flex items-center dark:text-gray-400">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_3')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const FAQSection = () => (
    <div id="faq" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#0B2441] mb-4 dark:text-blue-600">
          {t('frequently_asked_questions')}
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('faq_subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {[
            {
              title: t('faq_question_1'),
              content: t('faq_answer_1')
            },
            {
              title: t('faq_question_2'),
              content: t('faq_answer_2')
            },
            {
              title: t('faq_question_3'),
              content: t('faq_answer_3')
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-[#2189FF] mb-4">
                {faq.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                {faq.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0B2441] dark:text-white">
          {selectedCategory === 'all'
            ? t('all_products')
            : categories.find(c => c.id === selectedCategory)?.name || selectedCategory
          }
        </h2>
        <button
          onClick={() => setDrawerVisible(true)}
          className="md:hidden"
        >
          <MenuOutlined />
        </button>
      </div>

      <div className="block mb-6">
        <CategoryPanel />
      </div>

      <CategoryDrawer />

      <div className="grid grid-cols-2 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white flex flex-col items-center justify-between rounded-lg shadow-md overflow-hidden cursor-pointer group relative transform transition-transform duration-300 hover:scale-105 dark:bg-gray-800"
          >
            <div
              className="relative w-full h-28 md:h-48 overflow-hidden"
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
                src={product.img || product.images.map((image, index) => image)[currentImageIndex[product.id] || 0]}
                alt={getLocalizedName(product)}
                className="w-full h-full md:h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
              className="p-4 w-full"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-sm md:text-lg font-semibold mb-2 line-clamp-2 text-[#0B2441] dark:text-white">{getLocalizedName(product)}</h3>
              <div className="flex items-center justify-between gap-1 md:gap-0">
                <span className="text-[#2189FF] font-semibold md:font-bold text-[11px] md:text-lg">
                  {product.price ? `${product.price.toLocaleString()} so'm` : 'Narx ko\'rsatilmagan'}
                </span>
                <Button
                  type="primary"
                  icon={<FileSearchOutlined size={28} className="block md:hidden" />}
                  onClick={() => handleProductDetail(product.id)}
                  className="text-[10px] md:text-[16px] mobile-icon-only border border-spacing-1 flex items-center justify-center"
                >
                  <p className="hidden md:inline">Batafsil</p>
                </Button>
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

      <AboutSection />
      <FAQSection />
    </div>
  );
};

export default Home;
