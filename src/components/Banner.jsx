import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Banner = () => {
    const slides = [
        {
            image: "https://wallpapers.com/images/featured/sales-758f61svbv17elgb.jpg",
            title: "📢 Maxsus chegirmalar!",
            description: "Faqat bugun mahsulotlarga 50% chegirma! 🛍️",
        },
        {
            image: "https://img.freepik.com/free-photo/black-friday-sales-elements-assortment-with-copy-space_23-2148665617.jpg",
            title: "🔥 Tezda sotib oling!",
            description: "Eng yaxshi narxlar bu yerda! 💰",
        },
        {
            image: "https://t4.ftcdn.net/jpg/06/77/02/57/360_F_677025783_psFcLAG8Pp5v4AHSM0JCk2rQttEzXT7N.jpg",
            title: "🎉 Yangi yil maxsus takliflari!",
            description: "Yangi yil sovg‘alari va maxsus aksiyalar! 🎄",
        },
    ];

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop
                className="max-w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            ></div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 z-10">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold animate-pulse">
                                    {slide.title}
                                </h2>
                                <p className="mt-4 text-lg md:text-xl lg:text-2xl animate-pulse">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

