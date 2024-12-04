import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  uz: {
    cart: 'Savatcha',
    cartEmpty: "Savatchangiz bo'sh",
    remove: "O'chirish",
    orderSummary: 'Buyurtma ma\'lumotlari',
    enterName: 'Ismingizni kiriting',
    enterPhone: 'Telefon raqamingizni kiriting',
    enterAddress: 'Manzilingizni kiriting',
    total: 'Jami',
    placeOrder: 'Buyurtma berish'
  },
  ru: {
    cart: 'Корзина',
    cartEmpty: 'Ваша корзина пуста',
    remove: 'Удалить',
    orderSummary: 'Информация о заказе',
    enterName: 'Введите ваше имя',
    enterPhone: 'Введите номер телефона',
    enterAddress: 'Введите ваш адрес',
    total: 'Итого',
    placeOrder: 'Оформить заказ'
  }
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('uz');

  const value = {
    language,
    setLanguage,
    t: (key) => translations[language][key] || key
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
