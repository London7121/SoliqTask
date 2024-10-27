import React, { useEffect } from 'react'
import { Collapse } from 'antd';
import plus_icon from '../assets/icons/add-circle.png'
import 'aos/dist/aos.css'
import Aos from 'aos';
const { Panel } = Collapse;

export default function Faq() {
    const faqs = [
        {
            question: "Farobiy IT Academy bu nima?",
            answer: "Farobiy IT Academy, IT sohasida bilim va ko'nikmalarni rivojlantirish uchun zamonaviy ta'lim dasturlarini o'rgatuvchi markaz.",
        },
        {
            question: "Farobiy IT Academy a'zoligimga nimalar kiradi?",
            answer: "Farobiy IT Academy a'zoligimga kop narsalar kiradi",
        },
        {
            question: "Farobiy IT Academy dan nimani o'rganishim mumkin?",
            answer: "Farobiy IT Academy dan kop narsalarni organish mumkin.",
        },
        {
            question: "Sinovim tugagandan keyin nima bo'ladi?",
            answer: "Sinovim tugagandan keyin ish boshlanadi.",
        },
        {
            question: "Farobiy IT Academy da dars bera olamanmi?",
            answer: "Farobiy IT Academy da dars bera olasan.",
        },
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
