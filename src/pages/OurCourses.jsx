import React, { useEffect, useState } from 'react'
import img1 from '../assets/images/img5.png';
import img2 from '../assets/images/img2.png';
import img3 from '../assets/images/img3.png';
import img4 from '../assets/images/img4.png';
import img5 from '../assets/images/img1.png';
import { GoArrowRight } from 'react-icons/go'
import Aos from 'aos';
import 'aos/dist/aos.css'
import { Link as ScrollLink } from 'react-scroll'

export default function OurCourses() {
    const texts = [
        'Tez orada yangi kurs!',
        'Kurslarimizga qo\'shiling!',
        'O\'rganish imkoniyatlari sizni kutmoqda!',
    ];

    const [currentText, setCurrentText] = useState(texts[0]);
    const [index, setIndex] = useState(0);


    useEffect(() => {
        Aos.init()
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 1400);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCurrentText(texts[index]);
    }, [index]);
    return (
        <div>
            <div id="ourCourses" className="my-16 h-auto py-2">
                <p className='text-[#0B2441] text-[28px] font-bold'>Kategoriyalar</p>
                <div className='my-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Card 1 */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="w-full h-[270px] relative overflow-hidden rounded-[40px]">
                        <img className="w-full h-full object-cover" src="https://frankfurt.apollo.olxcdn.com/v1/files/wg9dppgduec4-UZ/image;s=1000x700" alt="img1" />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] rounded-[40px]"></div>
                        <div className="absolute bottom-10 left-6 z-10">
                            <p className="text-white text-[24px] font-bold mb-2">Maishiy texnik</p>
                            <ScrollLink
                                to="maishiyTex"
                                smooth={true}
                                duration={500}
                                style={{ color: '#0B2441' }}
                                className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#2189FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
                            >
                                Batafsil <GoArrowRight size={25} />
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1150"
                        className="w-full h-[270px] relative overflow-hidden rounded-[40px]">
                        <img className="w-full h-full object-cover" src="https://images.uzum.uz/cp671vfj2e4qlbisp1rg/original.jpg" alt="img4" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] rounded-[40px]"></div>
                        <div className="absolute bottom-10 left-6 z-10">
                            <p className="text-white text-[24px] font-bold mb-2">Erkaklar uchun</p>
                            <ScrollLink
                                to="erkaklar"
                                smooth={true}
                                duration={500}
                                style={{ color: '#0B2441' }}
                                className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#2189FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
                            >
                                Batafsil <GoArrowRight size={25} />
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1250"
                        className="w-full h-[330px] relative overflow-hidden rounded-[40px]">
                        <img className="w-full h-full object-cover" src="https://img.kwcdn.com/product/fancy/cb52098a-0aa7-436d-a9b4-e09317be8d3c.jpg?imageView2/2/w/800/q/70/format/webp" alt="img3" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] rounded-[40px]"></div>
                        <div className="absolute bottom-10 left-6 z-10">
                            <p className="text-white text-[24px] font-bold mb-2">Ayollar uchun</p>
                            <ScrollLink
                                to="ayollar"
                                smooth={true}
                                duration={500}
                                style={{ color: '#0B2441' }}
                                className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#2189FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
                            >
                                Batafsil <GoArrowRight size={25} />
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1300"
                        className="w-full h-[330px] relative overflow-hidden rounded-[40px]">
                        <img className="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCRcSMwLpuDUKEHeyDPDGaguuFBKWNA5_NNw&s" alt="img2" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] rounded-[40px]"></div>
                        <div className="absolute bottom-10 left-6 z-10">
                            <p className="text-white text-[24px] font-bold mb-2">Bolalar uchun</p>
                            <ScrollLink
                                to="bolalar"
                                smooth={true}
                                duration={500}
                                style={{ color: '#0B2441' }}
                                className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#2189FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
                            >
                                Batafsil <GoArrowRight size={25} />
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1400"
                        className="w-full h-[330px] relative overflow-hidden rounded-[40px]">
                        <img className="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1xJpNjcAgmWEwBpIaCx0G1MNwGvAIZfziyA&s" alt="img5" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)] rounded-[40px]"></div>
                        <div className="absolute bottom-10 left-6 z-10">
                            <p className="text-white text-[24px] font-bold mb-2">Kitoblar</p>
                            <ScrollLink
                                to="kitoblar"
                                smooth={true}
                                duration={500}
                                style={{ color: '#0B2441' }}
                                className="text-[15px] cursor-pointer font-medium w-[140px] h-[45px] rounded-[16px] bg-[#2189FF] duration-100 hover:bg-[#e0ecf8] text-[#2189FF] flex items-center justify-center gap-3 px-2 ml-2"
                            >
                                Batafsil <GoArrowRight size={25} />
                            </ScrollLink>
                        </div>
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-duration="1500"
                        className="w-[100%] h-[210px] rounded-[40px] bg-[#EAF4FF] mt-5 overflow-hidden flex flex-col items-center">
                        <p className="text-[#0B2441] pt-8 text-[24px] font-bold w-[130px] text-center">Chegirmadagi mahsulotlar</p>
                        <p
                            className="w-[110%] h-[50px] text-white bg-[#2189FF] flex items-center justify-center mt-4"
                            style={{
                                transform: 'rotate(-11deg)',
                                transformOrigin: 'center'
                            }}
                        >
                            {currentText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
