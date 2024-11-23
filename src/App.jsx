import React, { useState } from 'react';
import logo from '../src/assets/icons/Power .png';
import book from '../src/assets/icons/Book.png';
import tell from '../src/assets/icons/call.png';
import start from '../src/assets/icons/star.png';
import banner_img from '../src/assets/images/banner_img.png';
import { Link as ScrollLink } from 'react-scroll'
import AntSelect from './components/AntSelect';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Faq from './components/Faq';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollTopButton';
import OurCourses from './pages/OurCourses';
import OurTeachers from './pages/OurTeachers';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import MaqishiyTex from './pages/MaqishiyTex';
import Erkaklar from './pages/Erkaklar';
import Ayollar from './pages/Ayollar';
import Bolalar from './pages/Bolalar';
import Kitoblar from './pages/Kitoblar';


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className='max-w-[1450px] mx-auto'>
      <ScrollToTopButton />

      {/* header section */}
      <nav className="flex flex-col md:flex-row items-center justify-between m-4">
        <div className="flex items-center justify-between w-full md:w-auto gap-7 ml-4">
          <a href="/">
            <img src={logo} alt="logo" className="w-28 h-auto cursor-pointer" />
          </a>
          <ScrollLink
            to="ourCourses"
            smooth={true}
            duration={500}
            style={{ color: '#0B2441' }}
            className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#EAF4FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
          >
            Kategoriyalar
            <img className='w-[180px]' src={book} alt="book" />
          </ScrollLink>
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center p-2 border border-[#2189FF] rounded text-[#2189FF] transition-transform duration-300"
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
              <RxHamburgerMenu size={25} />
            </div>
            <div className={`absolute transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
              <IoMdClose size={25} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`flex flex-col md:flex-row items-center gap-9 mt-4 md:mt-0 md:flex transition-all duration-500 ease-in-out overflow-hidden 
          ${isOpen ? 'max-h-[500px]' : 'max-h-0 md:max-h-12'} w-full md:w-auto`}>
          <ScrollLink
            to="teachersSection"
            smooth={true}
            duration={500}
            style={{ color: '#0B2441' }}
            className="text-[15px] font-medium cursor-pointer"
          >
            Ommabop mahsulotlar
          </ScrollLink>
          <ScrollLink
            to="aboutUs"
            smooth={true}
            duration={500}
            style={{ color: '#0B2441' }}
            className="text-[15px] font-medium cursor-pointer"
          >
            Biz haqimizda
          </ScrollLink>
          <ScrollLink
            to="faq"
            smooth={true}
            duration={500}
            style={{ color: '#0B2441' }}
            className="text-[15px] font-medium cursor-pointer"
          >
            Ko'p so'raladigan savollar
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            style={{ color: '#0B2441' }}
            className="text-[15px] font-medium cursor-pointer"
          >
            Bog'lanish
          </ScrollLink>
          <AntSelect />
          <a href="tel:+998997443010" className="w-full md:w-auto px-5 h-[45px] rounded-[16px] bg-[#EAF4FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] text-[15px] font-semibold flex items-center justify-center gap-3">
            <img src={tell} alt="tell" />
            +998 997443010
          </a>

        </div>
      </nav>

      <div className="container mx-auto max-w-[1300px] h-auto p-8 my-2">
        {/* Banner section */}
        <div className="my-10 bg-[#EAF4FF] rounded-[36px] flex flex-col md:flex-row items-center justify-between p-6 md:p-0">
          {/* Left side text */}
          <div className="w-full md:w-[50%] flex flex-col items-start h-auto md:gap-8 md:h-[250px] mb-6 md:mb-0 md:ml-10">
            <p className="text-[24px] font-medium text-[#0B2441] flex items-center gap-4 mb-4 md:mb-0">
              Power.uz
              <img className="w-[18px]" src={start} alt="start" />
            </p>
            <p className="font-bold text-[18px] lg:text-[28px] text-[#0B2441] mb-6 md:mb-0">
              Toshkent shahridagi <span className="text-[#2189FF]">eng yaxshi</span> sifatli online do'kon
            </p>
            <button className="w-[200px] h-[45px] rounded-[16px] bg-[#2189FF] text-[#EAF4FF] text-[15px] font-medium flex items-center justify-center p-1">
              <ScrollLink
                to="ourCourses"
                smooth={true}
                duration={500}
                style={{ color: '#0B2441' }}
                className="text-[15px] font-medium cursor-pointer"
              >
                Mahsulotlarni tanlash
              </ScrollLink>            </button>
          </div>

          {/* Right side image */}
          <div className="w-[400px] md:w-[40%] flex justify-center md:justify-end">
            <img className="rounded-tr-[30px] rounded-br-[30px] w-[300px] md:w-auto" src="https://m.media-amazon.com/images/I/71yGCVj4+wL.jpg" alt="banner_img" />
          </div>
        </div>

        {/* Our courses */}
        <OurCourses />

        {/* ourTeachers */}
        <OurTeachers />
        <MaqishiyTex />
        <Erkaklar />
        <Ayollar />
        <Bolalar />
        <Kitoblar />

        {/* about us */}
        <AboutUs />

        {/* FAQ */}
        <div id="faq" className="my-10 h-auto py-10">
          <p className='text-[#0B2441] text-[28px] font-bold text-center lg:text-start'>Ko'p so'raladigan savollar</p>
          <Faq />
        </div>

        {/* contact section */}
        <Contact />

      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
