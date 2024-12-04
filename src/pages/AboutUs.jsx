import img6 from '../assets/images/photo_2024-11-24_02-24-32.jpg';
import img7 from '../assets/images/photo_2024-11-24_02-27-57.jpg';
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
        <div id="about" className="min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Biz haqimizda</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#2189FF]">Power.uz - Sizning ishonchli hamkoringiz</h3>
                        <p className="text-gray-600">
                            Power.uz - bu O'zbekistonning eng yirik va ishonchli onlayn do'konlaridan biri. Biz 2023-yildan beri mijozlarimizga yuqori sifatli mahsulotlar va ajoyib xizmat ko'rsatib kelmoqdamiz.
                        </p>
                        
                        <div className="space-y-4">
                            <h4 className="font-semibold">Bizning afzalliklarimiz:</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Keng assortimentdagi mahsulotlar</li>
                                <li>Hamyonbop narxlar</li>
                                <li>Tez va ishonchli yetkazib berish</li>
                                <li>Professional mijozlar xizmati</li>
                                <li>Sifat kafolati</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-[#2189FF]">Bizning maqsadimiz</h3>
                        <p className="text-gray-600">
                            Bizning asosiy maqsadimiz - mijozlarimizga eng sifatli mahsulotlarni qulay narxlarda taqdim etish va mukammal xarid tajribasini yaratishdir.
                        </p>
                        
                        <div className="space-y-4">
                            <h4 className="font-semibold">Bizning qadriyatlarimiz:</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>Sifat va ishonchlilik</li>
                                <li>Mijozlar manfaati</li>
                                <li>Doimiy rivojlanish</li>
                                <li>Innovatsion yechimlar</li>
                                <li>Ijtimoiy mas'uliyat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
