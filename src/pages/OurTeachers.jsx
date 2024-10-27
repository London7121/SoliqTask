import { useEffect } from 'react'
import data from '../data/data'
import Aos from 'aos';
import 'aos/dist/aos.css'

export default function OurTeachers() {
    useEffect(() => {
        Aos.init()
    }, []);
    return (
        <div>
            <div id="teachersSection" className="my-10 h-auto">
                <p className='text-[#0B2441] text-[28px] font-bold text-center lg:text-start'>Bizning ustozlarimiz</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8'>
                    {
                        data?.map((item, index) => (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay={index * 200}
                                key={index} className="w-full h-auto flex flex-col items-center justify-center gap-4 text-[#0B2441]">
                                <img className="w-[225px] h-[225px] object-cover" src={item.img} alt="img" />
                                <p className='text-[20px] font-semibold text-center'>{item?.title}</p>
                                <div className='flex items-center justify-center gap-2'>
                                    <img src={item?.icon} alt="icon" className="w-[20px] h-[20px]" />
                                    <p>{item?.job_name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
