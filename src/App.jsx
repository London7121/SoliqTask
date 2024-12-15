import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import AppRoutes from './routes/AppRoutes';
import SnowAnimation from './components/SnowAnimation';
import Header from './components/Header';
import Loading from './components/Loading';
import { Suspense } from 'react';
import { ScrollToTopButton } from './components/ScrollTopButton';
import ProductModal from './components/ProductModal';
import { Banner } from './components/Banner';
import ScrollToTop from './services/scrollTop';
import WelcomeSound from './services/welcomeSound';
import Countdown from './services/countDown';

function AppContent() {
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const showBannerRoutes = ['/', '/home', '/yangi-yil'];
    setShowBanner(showBannerRoutes.includes(location.pathname));
  }, [location.pathname]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-light-body dark:bg-dark-body text-light-text dark:text-dark-text transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <Countdown/>
      {showBanner && <Banner />}
      <SnowAnimation />
      <div className="pt-24">
        <AppRoutes onProductClick={handleProductClick} />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <Router>
                  {/* <WelcomeSound/> */}
                  <AppContent />
                </Router>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
