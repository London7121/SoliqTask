import React from 'react';
import { Carousel } from 'antd';

const bannerData = [
  {
    title: "Power.uz - Eng yaxshi online do'kon",
    subtitle: "Toshkent shahridagi eng sifatli mahsulotlar",
    image: "https://m.media-amazon.com/images/I/71yGCVj4+wL.jpg",
    buttonText: "Mahsulotlarni tanlash"
  },
  {
    title: "Yangi kelgan mahsulotlar",
    subtitle: "Eng so'nggi va zamonaviy mahsulotlar",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27c4",
    buttonText: "Yangiliklarga o'tish"
  },
  {
    title: "Chegirmalar va aksiyalar",
    subtitle: "Eng yaxshi narxlar faqat bizda",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f8da1268",
    buttonText: "Chegirmalarni ko'rish"
  }
];

const BannerSlider = () => {
  return (
    <Carousel autoplay>
      {bannerData.map((banner, index) => (
        <div key={index} className="relative">
          <div 
            className="h-[400px] bg-cover bg-center flex items-center justify-start p-10"
            style={{ 
              backgroundImage: `url(${banner.image})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(0,0,0,0.4)'
            }}
          >
            <div className="text-white max-w-[50%]">
              <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
              <p className="text-xl mb-6">{banner.subtitle}</p>
              <button className="bg-[#2189FF] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                {banner.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default BannerSlider;
