import Aos from 'aos';
import React, { useEffect } from 'react'
import logo2 from '../assets/icons/logo2.png';
import start from '../assets/icons/star.png';
import 'aos/dist/aos.css'
import AntdForm from '../components/AntdForm';

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
                    <p className="text-[24px] font-medium text-[#0B2441] text-center flex items-center gap-4 mb-4 md:mb-0">
                        Tanlovda yordam beramiz!
                        <img className="w-[18px]  hidden md:flex" src={start} alt="start" />
                    </p>
                    <p className="font-bold text-[16px] text-center lg:text-[16px] text-[#0B2441] w-full md:w-[320px]">
                        Kurs haqida savollaringiz bo'lsa yoki nimani tanlashni bilmasangiz, raqamingizni qoldiring - biz barcha savollaringizga javob beramiz.
                    </p>
                    <img className="w-[20px] md:w-[250px] absolute left-5 bottom-0 hidden md:flex" src={logo2} alt="logo2" />
                </div>

                {/* Right side form */}
                <div className="w-full md:w-[50%] flex justify-center md:justify-end">
                    <AntdForm />
                </div>
            </div>
        </div>
    )
}
