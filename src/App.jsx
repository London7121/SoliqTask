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
import { Link as ScrollLink } from 'react-scroll';
import { Suspense } from 'react';
import { ScrollToTopButton } from './components/ScrollTopButton';
import { Footer } from './components/Footer';
import ProductModal from './components/ProductModal';
import YangiYil from './pages/YangiYil';
import CategoryPage from './pages/CategoryPage';
import {Banner} from './components/Banner';

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-[1450px] mx-auto">
      <Suspense fallback={<Loading />}>
        <ScrollToTopButton />
      </Suspense>

      <Header isOpen={isOpen} toggleMenu={toggleMenu} onAddProduct={handleAddProduct} />
      <AppRoutes
        onProductClick={handleProductClick}
      />

      {/* <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense> */}

      <Suspense fallback={<Loading />}>
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={selectedProduct}
        />
      </Suspense>

    </div>
  );
}

function App() {
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
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <Router>
                  <div className="min-h-screen bg-light-body dark:bg-dark-body text-light-text dark:text-dark-text transition-colors duration-300">
                    <Header />
                    <Banner />
                    <SnowAnimation />

                    <div className="pt-24">
                      <AppRoutes>
                        <Route path="/yangi-yil" element={<YangiYil />} />
                      </AppRoutes>
                    </div>
                    {/* <Footer /> */}

                    <ProductModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      product={selectedProduct}
                    />

                    <ScrollToTopButton />
                  </div>
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
