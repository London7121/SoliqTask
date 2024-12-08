import React, { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import Loading from './components/Loading';
import Header from './components/Header';
// import AddProductModal from './components/AddProductModal';
import SnowAnimation from './components/SnowAnimation';

// Lazy loaded components
const AntSelect = lazy(() => import('./components/AntSelect'));
const Faq = lazy(() => import('./components/Faq'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTopButton = lazy(() => import('./components/ScrollTopButton'));
const OurCourses = lazy(() => import('./pages/OurCourses'));
const OurTeachers = lazy(() => import('./pages/OurTeachers'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MaqishiyTex = lazy(() => import('./pages/MaqishiyTex'));
const Erkaklar = lazy(() => import('./pages/Erkaklar'));
const Ayollar = lazy(() => import('./pages/Ayollar'));
const Bolalar = lazy(() => import('./pages/Bolalar'));
const Kitoblar = lazy(() => import('./pages/Kitoblar'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const Login = lazy(() => import('./pages/Admin/Login'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const Home = lazy(() => import('./pages/Home'));
const FAQ = lazy(() => import('./pages/FAQ'));

import start from '../src/assets/icons/star.png';
import tell from '../src/assets/icons/call.png';
import { resolveDynamicLink } from './utils/dynamicLinkResolver';

const Banner = React.memo(() => (
  <div className="my-10 bg-[#EAF4FF] rounded-[36px] flex flex-col md:flex-row items-center justify-between p-6 md:p-0">
    <div className="w-full md:w-[50%] flex flex-col items-start h-auto md:gap-8 md:h-[250px] mb-6 md:mb-0 md:ml-10">
      <p className="text-[24px] font-medium text-[#0B2441] flex items-center gap-4 mb-4 md:mb-0">
        Power.uz
        <img className="w-[18px]" src={start} alt="start" loading="lazy" />
      </p>
      <p className="font-bold text-[18px] lg:text-[28px] text-[#0B2441] mb-6 md:mb-0">
        Toshkent shahridagi <span className="text-[#2189FF]">eng yaxshi</span> sifatli online do'kon
      </p>
      <ScrollLink
        to="ourCourses"
        smooth={true}
        duration={500}
        className="w-[200px] h-[45px] rounded-[16px] bg-[#2189FF] text-[#EAF4FF] text-[15px] font-medium flex items-center justify-center p-1"
      >
        Mahsulotlarni tanlash
      </ScrollLink>
    </div>
    <div className="w-[400px] md:w-[40%] flex justify-center md:justify-end">
      <img 
        className="rounded-tr-[30px] rounded-br-[30px] w-[300px] md:w-auto" 
        src="https://m.media-amazon.com/images/I/71yGCVj4+wL.jpg" 
        alt="banner_img" 
        loading="lazy"
      />
    </div>
  </div>
));

const NavigationMenu = React.memo(({ isOpen }) => (
  <div className={`flex flex-col md:flex-row items-center gap-9 mt-4 md:mt-0 md:flex transition-all duration-500 ease-in-out overflow-hidden 
    ${isOpen ? 'max-h-[500px]' : 'max-h-0 md:max-h-12'} w-full md:w-auto`}>
    <NavLink to="teachersSection" text="Ommabop mahsulotlar" />
    <NavLink to="aboutUs" text="Biz haqimizda" />
    <NavLink to="faq" text="Ko'p so'raladigan savollar" />
    <NavLink to="contact" text="Bog'lanish" />
    <Suspense fallback={<div>Loading...</div>}>
      <AntSelect />
    </Suspense>
    <a href="tel:+998997443010" className="w-full md:w-auto px-5 h-[45px] rounded-[16px] bg-[#EAF4FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] text-[15px] font-semibold flex items-center justify-center gap-3">
      <img src={tell} alt="tell" loading="lazy" />
      +998 997443010
    </a>
  </div>
));

const NavLink = React.memo(({ to, text }) => (
  <ScrollLink
    to={to}
    smooth={true}
    duration={500}
    className="text-[15px] font-medium cursor-pointer"
    style={{ color: '#0B2441' }}
  >
    {text}
  </ScrollLink>
));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/erkaklar" element={<Erkaklar onProductClick={handleProductClick} />} />
        <Route path="/ayollar" element={<Ayollar onProductClick={handleProductClick} />} />
        <Route path="/bolalar" element={<Bolalar onProductClick={handleProductClick} />} />
        <Route path="/kitoblar" element={<Kitoblar onProductClick={handleProductClick} />} />
        <Route path="/courses" element={<OurCourses onProductClick={handleProductClick} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>

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

const DynamicLinkResolver = () => {
  const { linkId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const resolveLink = async () => {
      const resolvedPath = await resolveDynamicLink(linkId);
      if (resolvedPath) {
        navigate(resolvedPath);
      } else {
        navigate('/');
      }
    };

    resolveLink();
  }, [linkId, navigate]);

  return <div>Yo'naltirilmoqda...</div>;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <Router>
                <div className="App">
                  <SnowAnimation />
                  <AppContent />
                </div>
              </Router>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
