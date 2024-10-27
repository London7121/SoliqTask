import img6 from '../assets/images/img6.png';
import img7 from '../assets/images/img7.png';
import like from '../assets/icons/like.png';
import medal from '../assets/icons/medal-star.png';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
import Aos from 'aos';

export default function AboutUs() {
    useEffect(() => {
        Aos.init()
    }, []);

    return (
        <div>
            <div id="aboutUs" className="my-10 h-auto py-10">
                <p className='text-[#0B2441] text-[28px] font-bold text-center lg:text-start'>Biz haqimizda</p>
                <div className='mt-8 text-[#0B2441] grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1300px] mx-auto'>
                    <div className='flex flex-col items-center justify-start gap-4'>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            className='w-full h-[220px] bg-[#F1E2C1] rounded-[40px] p-8 flex flex-col items-start'>
                            <img src={like} alt="like" className="mb-3" />
                            <p className='font-medium text-[17px] md:text-[22px]'>Farobiy IT Academy - da biz oddiy ko'rinadigan yaratish harakati odamlar hayotida o'sish.</p>
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1300"
                            className='w-full h-[400px] rounded-[40px] overflow-hidden'>
                            <img src={img7} alt="img7" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-start gap-4'>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1350"
                            className='w-full h-[420px] rounded-[40px] overflow-hidden'>
                            <img src={img6} alt="img7" className="w-full h-full object-cover" />
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1400"
                            className='w-full h-[200px] bg-[#D8DBFB] rounded-[40px] p-8 flex flex-col items-start'>
                            <img src={medal} alt="medal" className="mb-3" />
                            <p className='font-medium text-[16px] md:text-[20px]'>Farobiy IT Academy - bu illyustratsiya, dizayn, fotografiya, video, freelancing va boshqa mavzularda ijodiy va qiziquvchan.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
