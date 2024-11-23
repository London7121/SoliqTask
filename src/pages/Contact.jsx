import Aos from 'aos';
import React, { useEffect } from 'react'
import Power from '../assets/icons/Power .png';
import start from '../assets/icons/star.png';
import 'aos/dist/aos.css'
import AntdForm from '../components/AntdForm';
import { Button } from 'antd';

export default function Contact() {
    useEffect(() => {
        Aos.init()
    }, []);
    return (
        <div>
            <div
                data-aos="fade-up"
                data-aos-duration="1100"
                id='contact' className="my-10 bg-[#EAF4FF] rounded-[36px] flex flex-col md:flex-row items-center justify-between p-5">
                {/* Left side text */}
                <div className="w-full relative md:w-[50%] flex flex-col items-start h-auto md:gap-8 md:h-[366px] mb-6 md:mb-0 md:ml-10 py-10">
                    <img className="w-[20px] md:w-[340px] left-5  hidden md:flex" src={Power} alt="logo2" />
                    <p className="text-[33px] font-medium text-[#23d113] text-center flex items-center gap-4 mb-4 md:mb-0">
                        Tanlovda yordam beramiz!
                        <img className="w-[18px]  hidden md:flex" src={start} alt="start" />
                    </p>
                    <p className="font-bold textStyle text-[16px] text-center lg:text-[20px] text-[#0B2441] w-full md:w-[320px]">
                        Power.uz doim siz bilan birga va mijozlar uchun xizmat ko'rsatishdan to'xtamaydi !
                    </p>
                </div>

                {/* Right side form */}
                <div className="w-full md:w-[50%] flex justify-center md:justify-end">
                    <AntdForm />
                </div>

            </div>
        </div>
    )
}
