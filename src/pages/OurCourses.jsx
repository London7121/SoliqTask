import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { RiArrowRightLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { Link as ScrollLink } from 'react-scroll'

const products = [
    {
        id: 1,
        name: "Gold Standard Whey Protein",
        price: 450000,
        image: "https://m.media-amazon.com/images/I/71yGCVj4+wL.jpg",
        description: "Premium sifatli protein kukuni, mushaklar o'sishi va tiklanishi uchun ideal. 100% sof protein, eng yuqori sifat.",
        features: [
            "24g protein har bir porsiyada",
            "Kam kaloriyali",
            "Tez so'riluvchi",
            "Mazali ta'm",
            "100% tabiiy ingredientlar"
        ]
    },
    {
        id: 2,
        name: "BCAA Energy",
        price: 320000,
        image: "https://gymbeam.sk/media/catalog/product/cache/bf5a31e851f50f3ed6850cbbf183db11/b/c/bcaa_energy_500g_blue_raspberry.png",
        description: "Mashg'ulot paytida energiya va mushak tiklanishi uchun BCAA aminokislotalari.",
        features: [
            "6g BCAA har porsiyada",
            "Energiya beruvchi kompleks",
            "Elektrolit balansi",
            "Mushak charchashini kamaytiradi",
            "10 xil ta'm"
        ]
    },
    {
        id: 3,
        name: "Creatine Monohydrate",
        price: 280000,
        image: "https://www.sportsdirect.com/images/products/94713391_h.jpg",
        description: "Kuch va mushak hajmini oshirish uchun eng samarali qo'shimcha.",
        features: [
            "5g toza kreatin",
            "Kuchni oshiradi",
            "Mushak hajmini ko'paytiradi",
            "Tez so'riladi",
            "Sof monohydrat"
        ]
    },
    {
        id: 4,
        name: "Pre-Workout Complex",
        price: 390000,
        image: "https://cdn.shopify.com/s/files/1/0576/1383/4281/products/CELLUCOR_C4_ORIGINAL_CHERRY_LIMEADE_390G_1_900x.jpg",
        description: "Mashg'ulot oldidan energiya va fokus uchun kompleks formula.",
        features: [
            "Kuchli energiya",
            "Fokusni oshiradi",
            "Mushak chidamliligini oshiradi",
            "Beta-alanin",
            "Kreatin kompleksi"
        ]
    }
];

export default function OurCourses({ onProductClick }) {
    const texts = [
        "Sifatli mahsulotlar",
        "Qulay narxlar",
        "Tezkor yetkazib berish"
    ];

    const [currentText, setCurrentText] = useState(texts[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        Aos.init()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentText(texts[index]);
    }, [index]);

    return (
        <div>
            <div id="ourCourses" className="my-16 h-auto py-2">
                <div data-aos="fade-up" className='flex flex-col lg:flex-row items-center justify-between gap-3'>
                    <div className='flex flex-col items-start gap-4'>
                        <p className='text-[28px] font-bold text-[#0B2441]'>Bizning mahsulotlar</p>
                        <p className='text-[16px] font-normal text-[#64748B]'>Power.uz - sifatli sport mahsulotlari</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <button className='w-[45px] h-[45px] rounded-[16px] bg-[#EAF4FF] flex items-center justify-center'>
                            <FaArrowLeft className='text-[20px] text-[#2189FF]' />
                        </button>
                        <button className='w-[45px] h-[45px] rounded-[16px] bg-[#EAF4FF] flex items-center justify-center'>
                            <FaArrowRight className='text-[20px] text-[#2189FF]' />
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            onClick={() => onProductClick(product)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#0B2441] mb-2">{product.name}</h3>
                                <p className="text-[#2189FF] font-bold">{product.price.toLocaleString()} so'm</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
