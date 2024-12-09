import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Input } from 'antd';
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';

import CategoryMenu from './CategoryMenu';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/icons/Power.png';

const { Search } = Input;

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { cartItems = [] } = useCart();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleDrawerItemClick = (path) => {
    navigate(path);
    onClose();
    setIsMenuOpen(false);
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
      name: 'Yangi Yil',
      path: '/yangi-yil'
    },
    {
      name: t('faq'),
      onClick: () => scrollToSection('faq')
    }
  ];

  const menuItems = [
    { icon: <FaBars />, label: t('menu'), path: '/' },
    { icon: <ShoppingCartOutlined />, label: t('cart'), path: '/cart' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 w-full bg-white dark:bg-dark-secondary shadow-md z-50 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Power.uz Logo" className="h-6 md:h-20 w-auto" />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <MdLightMode className="text-yellow-500 text-2xl" />
            ) : (
              <MdDarkMode className="text-gray-800 text-2xl" />
            )}
          </button>

          {/* Mobile menu tugmasi */}
          {/* <button 
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-2xl" />
          </button> */}
        </div>

        {/* Desktop Navigation */}
        <CategoryMenu />
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link, index) => (
            link.name === 'Yangi Yil' ? (
              <Link
                key={index}
                to={link.path || '/yangi-yil'}
                className="text-[#2189FF] hover:text-[#1a6cd1]"
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={index}
                onClick={link.onClick}
                className="text-[#2189FF] hover:text-[#1a6cd1]"
              >
                {link.name}
              </button>
            )
          ))}
          {/* {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-dark-primary transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))} */}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <MdLightMode className="text-yellow-500 text-2xl" />
            ) : (
              <MdDarkMode className="text-gray-800 text-2xl" />
            )}
          </button>
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          {/* <div className="hidden md:block w-64">
            <Search 
              placeholder={t('search')}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
              className="rounded-full"
            />
          </div> */}

          <button
            onClick={() => navigate('/cart')}
            className="relative text-gray-700 hover:text-[#2189FF] transition-colors"
          >
            <ShoppingCartOutlined className="text-2xl dark:text-blue-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={showDrawer}
            className="md:hidden text-gray-700 dark:text-blue-300"
          >
            <MenuOutlined className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-secondary shadow-md">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-3 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title={<img src={logo} alt="Power.uz Logo" className="h-10 w-auto" />}
        placement="right"
        onClose={onClose}
        open={drawerVisible}
        className="mobile-drawer"
      >
        {/* <div className="mb-4">
          <Search 
            placeholder={t('search')}
            onSearch={handleSearch}
            enterButton={<SearchOutlined />}
          />
        </div> */}

        <CategoryMenu />

        <nav className="mt-4 space-y-4">
          {navigationLinks.map((link, index) => (
            link.name === 'Yangi Yil' ? (
              <Link
                key={index}
                to={link.path || '/yangi-yil'}
                className="block w-full text-left text-gray-700 hover:text-[#2189FF]"
                onClick={() => handleDrawerItemClick(link.path || '/yangi-yil')}
              >
                {link.name}
              </Link>
            ) : (
              <button
                key={index}
                onClick={link.onClick}
                className="block w-full text-left text-gray-700 hover:text-[#2189FF]"
              >
                {link.name}
              </button>
            )
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
            <ShoppingCartOutlined className="text-xl dark:text-blue-300" />
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
