import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Input } from 'antd';
import { 
  MenuOutlined, 
  SearchOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';

import CategoryMenu from './CategoryMenu';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/icons/P.png';

const { Search } = Input;

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { t } = useLanguage();
  const { cartItems = [] } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (value) => {
    navigate(`/search?query=${value}`);
  };

  const navigationLinks = [
    { 
      name: t('about_us'), 
      onClick: () => scrollToSection('about') 
    },
    { 
      name: t('faq'), 
      onClick: () => scrollToSection('faq') 
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 pb-1 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Power.uz Logo" className="h-20 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <CategoryMenu />
          {navigationLinks.map((link, index) => (
            <button 
              key={index} 
              onClick={link.onClick} 
              className="text-[#2189FF] hover:text-[#1a6cd1]"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-64">
            <Search 
              placeholder={t('search')}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              className="rounded-full"
            />
          </div>

          <button 
            onClick={() => navigate('/cart')} 
            className="relative text-gray-700 hover:text-[#2189FF] transition-colors"
          >
            <ShoppingCartOutlined className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={showDrawer} 
            className="md:hidden text-gray-700"
          >
            <MenuOutlined className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<img src={logo} alt="Power.uz Logo" className="h-10 w-auto" />}
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        className="mobile-drawer"
      >
        <div className="mb-4">
          <Search 
            placeholder={t('search')}
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
          />
        </div>

        <CategoryMenu />

        <nav className="mt-4 space-y-4">
          {navigationLinks.map((link, index) => (
            <button 
              key={index}
              onClick={link.onClick}
              className="block w-full text-left text-gray-700 hover:text-[#2189FF] transition-colors"
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => {
              navigate('/cart');
              onClose();
            }} 
            className="flex items-center space-x-2 text-gray-700 hover:text-[#2189FF]"
          >
            <ShoppingCartOutlined className="text-xl" />
            <span>{t('cart')}</span>
            {cartItems.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
