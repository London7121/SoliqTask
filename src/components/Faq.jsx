import React, { useEffect } from 'react'
import { Collapse } from 'antd';
import plus_icon from '../assets/icons/add-circle.png'
import 'aos/dist/aos.css'
import Aos from 'aos';
const { Panel } = Collapse;

export default function Faq() {
    const faqs = [
        {
            question: "Tezkor yetkazib berish xizmati",
            answer: "Buyurtmalarni O'zbekistonning barcha hududlariga 3 kun ichida yetkazib berish",
        },
        {
            question: "Mijozlarni rag'batlantirish tizimi",
            answer: "Doimiy va aktiv mijozlar uchun bonuslar va o'ziga xos sovg'alar to'plami",
        },
        {
            question: "To'lov turlari",
            answer: "Oldindan click, payme yoki buyurtmalarni qabul qilib olganingizdan so'ng o'zingizga qulay bo'lgan usulda to'lov qilish imkoniyati",
        },
        {
            question: "Call - Center",
            answer: "Murojaat va takliflar uchun 24/7 rejimida qo'llab quvvatlash imkoniyati +998 99 744 30 10 | +998 93 367 90 67",
        },
        // {
        //     question: "Farobiy IT Academy da dars bera olamanmi?",
        //     answer: "Farobiy IT Academy da dars bera olasan.",
        // },
    ];
    useEffect(() => {
        Aos.init()
    }, []);

    return (
        <div>
            <div

                className="py-10">
                <Collapse
                    className="mt-8"
                    accordion
                    style={{ background: 'transparent' }}
                    bordered={false}
                    expandIcon={() => null}
                    data-aos="fade-up"
                    data-aos-duration="1200"
                >
                    {faqs.map((faq, index) => (
                        <Panel
                            header={
                                <div className="flex justify-between items-center">
                                    <span className='text-[24px] font-semibold text-[#0B2441]'>{faq.question}</span>
                                    <span className="icon" style={{ marginLeft: 'auto' }}>
                                        <img src={plus_icon} alt="icon" />
                                    </span>
                                </div>
                            }
                            key={index}
                            style={{
                                marginBottom: '20px',
                                borderRadius: '40px',
                                padding: '10px',
                                background: "#F4F4F4"
                            }}

                        >
                            <p className='text-[20px] font-normal text-[#0B2441]'>{faq.answer}</p>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    )
}
