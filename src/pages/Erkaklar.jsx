import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { erkaklar } from '../data/erkaklar'
import { useLanguage } from '../context/LanguageContext';

export default function Erkaklar({ onProductClick }) {
    const { t, language } = useLanguage();
    const products = erkaklar[language];

    return (
        <div>
            <div id="erkaklar" className="my-16 h-auto py-2">
                <div data-aos="fade-up" className='flex flex-col lg:flex-row items-center justify-between gap-3'>
                    <div className='flex flex-col items-start gap-4'>
                        <p className='text-[28px] font-bold text-[#0B2441]'>{t('men')}</p>
                        <p className='text-[16px] font-normal text-[#64748B]'>{t('all_products')}</p>
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
                            onClick={() => onProductClick({
                                ...product,
                                name: product.title,
                                price: parseInt(product.job_name.replace(/[^\d]/g, '')),
                                image: product.img,
                                description: product.title,
                                features: [t('quality'), t('price'), t('delivery')]
                            })}
                        >
                            <div className="relative h-48">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#0B2441] mb-2">{product.title}</h3>
                                <p className="text-[#2189FF] font-bold">{product.job_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
