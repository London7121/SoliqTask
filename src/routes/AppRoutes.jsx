import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { Footer } from '../components/Footer';
import MaqishiyTex from '../pages/MaqishiyTex';
import MaishiyTex from '../pages/MaishiyTex';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Admin/Login'));
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
const Cart = lazy(() => import('../pages/Cart'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const Erkaklar = lazy(() => import('../pages/Erkaklar'));
const Ayollar = lazy(() => import('../pages/Ayollar'));
const Bolalar = lazy(() => import('../pages/Bolalar'));
const Kitoblar = lazy(() => import('../pages/Kitoblar'));
const OurCourses = lazy(() => import('../pages/OurCourses'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const FAQ = lazy(() => import('../pages/FAQ'));
const YangiYil = lazy(() => import('../pages/YangiYil'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

const AppRoutes = ({ onProductClick }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/erkaklar" element={<Erkaklar onProductClick={onProductClick} />} />
        <Route path="/ayollar" element={<Ayollar onProductClick={onProductClick} />} />
        <Route path="/bolalar" element={<Bolalar onProductClick={onProductClick} />} />
        <Route path="/bolalar/:subCategoryId" element={<Bolalar onProductClick={onProductClick} />} />
        <Route path="/kitoblar" element={<Kitoblar onProductClick={onProductClick} />} />
        <Route path="/maishiy-texnika" element={<MaqishiyTex onProductClick={onProductClick} />} />
        <Route path="/kitoblar/:subCategoryId" element={<Kitoblar onProductClick={onProductClick} />} />
        <Route path="/yangi-yil" element={<YangiYil onProductClick={onProductClick} />} />
        <Route path="/our-courses" element={<OurCourses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Footer />
    </Suspense>
  );
};

export default AppRoutes;
