import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useCart } from '../context/CartContext';
import AntSelect from './AntSelect';
import logo from '../assets/icons/Power .png';
import book from '../assets/icons/book.png';

const Header = ({ isOpen, toggleMenu }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const renderNavLinks = (onClick = null) => {
    if (!isHomePage) {
      return (
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer"
        >
          Bosh sahifa
        </button>
      );
    }

    return (
      <div className="flex flex-col md:flex-row items-center gap-8">
        <ScrollLink
          to="bolalar"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
          onClick={onClick}
        >
          Bolalar
        </ScrollLink>
        <ScrollLink
          to="kitoblar"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
          onClick={onClick}
        >
          Kitoblar
        </ScrollLink>
        <ScrollLink
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
          onClick={onClick}
        >
          Biz haqimizda
        </ScrollLink>
        <ScrollLink
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
          onClick={onClick}
        >
          Bog'lanish
        </ScrollLink>
        <ScrollLink
          to="faq"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
          onClick={onClick}
        >
          Ko'p so'raladigan savollar
        </ScrollLink>
      </div>
    );
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between m-4">
      <div className="flex items-center justify-between w-full md:w-auto gap-7 ml-4">
        <img 
          src={logo} 
          alt="logo" 
          className="w-28 h-auto cursor-pointer" 
          onClick={() => navigate('/')}
          loading="lazy" 
        />
        <ScrollLink
          to="ourCourses"
          smooth={true}
          duration={500}
          className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#EAF4FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
        >
          Kategoriyalar
          <img className='w-[180px]' src={book} alt="book" loading="lazy" />
        </ScrollLink>
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center p-2 border border-[#2189FF] rounded text-[#2189FF] transition-transform duration-300"
          aria-label="Toggle menu"
        >
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
            <RxHamburgerMenu size={25} />
          </div>
          <div className={`absolute transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
            <IoMdClose size={25} />
          </div>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {renderNavLinks()}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <AntSelect />
        <button 
          onClick={() => navigate('/cart')}
          className="relative flex items-center p-2 border border-[#2189FF] rounded text-[#2189FF] hover:bg-[#EAF4FF]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 w-full mt-4">
          {renderNavLinks(toggleMenu)}
          <AntSelect />
          <button 
            onClick={() => {
              navigate('/cart');
              toggleMenu();
            }}
            className="flex items-center gap-2 p-2 border border-[#2189FF] rounded text-[#2189FF] w-full justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Savatcha {cartItems.length > 0 && `(${cartItems.length})`}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
