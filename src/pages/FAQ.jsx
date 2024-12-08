import React, { useState } from 'react';
import { Collapse } from 'antd';
import { useLanguage } from '../context/LanguageContext';

const { Panel } = Collapse;

const FAQ = () => {
  const { t } = useLanguage();
  const [activeKey, setActiveKey] = useState([]);

  const faqData = [
    {
      key: '1',
      title: {
        uz: "Buyurtmani qanday berish mumkin?",
        ru: "Как сделать заказ?"
      },
      content: {
        uz: "Mahsulotni tanlang, savatga qo'shing va checkout qismida kerakli ma'lumotlarni to'ldiring.",
        ru: "Выберите товар, добавьте его в корзину и заполните необходимые данные в разделе оформления заказа."
      }
    },
    {
      key: '2',
      title: {
        uz: "Yetkazib berish qanday amalga oshiriladi?",
        ru: "Как осуществляется доставка?"
      },
      content: {
        uz: "Biz barcha viloyatlarga 2-3 ish kuni ichida yetkazib beramiz. Yetkazib berish narxi mahsulot miqdoriga bog'liq.",
        ru: "Мы доставляем во все области в течение 2-3 рабочих дней. Стоимость доставки зависит от количества товара."
      }
    },
    {
      key: '3',
      title: {
        uz: "Mahsulotni qaytarish mumkinmi?",
        ru: "Можно ли вернуть товар?"
      },
      content: {
        uz: "Ha, 14 kun ichida sifatsiz yoki xohlagan mahsulotni qaytarish mumkin. Qaytarish shartlari bilan batafsil tanishishingiz mumkin.",
        ru: "Да, вы можете вернуть некачественный или любой другой товар в течение 14 дней. Подробнее с условиями возврата можно ознакомиться."
      }
    }
  ];

  const handleChange = (keys) => {
    setActiveKey(keys);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#0B2441] mb-4">
          {t('frequently_asked_questions')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('faq_subtitle')}
        </p>
      </div>

      <Collapse 
        accordion 
        activeKey={activeKey} 
        onChange={handleChange}
        className="bg-white shadow-lg rounded-lg"
      >
        {faqData.map((faq) => (
          <Panel 
            key={faq.key} 
            header={faq.title.uz} 
            className="border-b last:border-b-0 border-gray-200"
          >
            <p className="text-gray-700">{faq.content.uz}</p>
          </Panel>
        ))}
      </Collapse>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-[#2189FF] mb-4">
          {t('still_have_questions')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('contact_support_text')}
        </p>
        <button 
          className="bg-[#2189FF] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('contact_support')}
        </button>
      </div>
    </div>
  );
};

export default FAQ;
