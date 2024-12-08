import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: {
        uz: "Sardor Qosimov",
        ru: "Сардор Касимов"
      },
      role: {
        uz: "Asoschi va Bosh direktor",
        ru: "Основатель и Генеральный директор"
      },
      image: "/team/sardor.jpg"
    },
    {
      name: {
        uz: "Dilroz Karimova",
        ru: "Дилроз Каримова"
      },
      role: {
        uz: "Marketing Direktori",
        ru: "Директор по маркетингу"
      },
      image: "/team/dilroz.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#0B2441] mb-4">
          {t('about_us_title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('about_us_description')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-semibold text-[#2189FF] mb-6">
            {t('our_mission')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('mission_description')}
          </p>
        </div>
        
        <div>
          <h2 className="text-3xl font-semibold text-[#2189FF] mb-6">
            {t('our_values')}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_1')}
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_2')}
            </li>
            <li className="flex items-center">
              <span className="mr-3 text-[#2189FF] text-2xl">✓</span>
              {t('value_3')}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center text-[#2189FF] mb-12">
          {t('our_team')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <img 
                src={member.image} 
                alt={member.name.uz} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#0B2441]">
                  {member.name.uz}
                </h3>
                <p className="text-gray-600 mt-2">
                  {member.role.uz}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
