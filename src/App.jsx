import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import Loading from './components/Loading';
import Header from './components/Header';

// Lazy loaded components
const AntSelect = lazy(() => import('./components/AntSelect'));
const Faq = lazy(() => import('./components/Faq'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTopButton = lazy(() => import('./components/ScrollTopButton'));
const OurCourses = lazy(() => import('./pages/OurCourses'));
const OurTeachers = lazy(() => import('./pages/OurTeachers'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const MaqishiyTex = lazy(() => import('./pages/MaqishiyTex'));
const Erkaklar = lazy(() => import('./pages/Erkaklar'));
const Ayollar = lazy(() => import('./pages/Ayollar'));
const Bolalar = lazy(() => import('./pages/Bolalar'));
const Kitoblar = lazy(() => import('./pages/Kitoblar'));
const Cart = lazy(() => import('./pages/Cart'));
const ProductModal = lazy(() => import('./components/ProductModal'));

import start from '../src/assets/icons/star.png';

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

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Router>
      <LanguageProvider>
        <CartProvider>
          <div className='max-w-[1450px] mx-auto'>
            <Suspense fallback={<Loading />}>
              <ScrollToTopButton />
            </Suspense>

            <Header isOpen={isOpen} toggleMenu={toggleMenu} />

            <Routes>
              <Route path="/cart" element={
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              } />
              <Route path="/" element={
                <div className="container mx-auto max-w-[1300px] h-auto p-8 my-2">
                  <Banner />
                  <Suspense fallback={<Loading />}>
                    <OurCourses onProductClick={handleProductClick} />
                    <OurTeachers onProductClick={handleProductClick} />
                    <MaqishiyTex onProductClick={handleProductClick} />
                    <Erkaklar onProductClick={handleProductClick} />
                    <Ayollar onProductClick={handleProductClick} />
                    <Bolalar onProductClick={handleProductClick} />
                    <Kitoblar onProductClick={handleProductClick} />
                    <AboutUs />
                    <div id="faq" className="my-10 h-auto py-10">
                      <p className='text-[#0B2441] text-[28px] font-bold text-center lg:text-start'>
                        Ko'p so'raladigan savollar
                      </p>
                      <Faq />
                    </div>
                    <Contact />
                  </Suspense>
                </div>
              } />
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
        </CartProvider>
      </LanguageProvider>
    </Router>
  );
}
