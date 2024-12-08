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
    placeOrder: 'Buyurtma berish',
    men: 'Erkaklar',
    women: 'Ayollar',
    children: 'Bolalar',
    books: 'Kitoblar',
    all_products: 'Barcha mahsulotlar',
    quality: 'Sifat',
    price: 'Narx',
    delivery: 'Yetkazib berish',
    appliances: 'Maishiy texnika',
    home: 'Bosh sahifa',
    about: 'Biz haqimizda',
    contact: 'Bog\'lanish',
    faq: 'Ko\'p so\'raladigan savollar',
    categories: 'Kategoriyalar',
    our_products: 'Bizning mahsulotlar',
    fillAllFields: "Iltimos, barcha ma'lumotlarni to'ldiring!",
    sendingOrder: 'Buyurtma yuborilmoqda...',
    orderSuccess: 'Buyurtmangiz muvaffaqiyatli yuborildi!',
    orderConfirmation: 'Tez orada siz bilan bog\'lanamiz.',
    newOrder: 'Yangi buyurtma berish',
    processing: 'Yuborilmoqda...',
    add_to_cart: "Savatga qo'shish",
    added_to_cart: "Qo'shildi",
    already_in_cart: "Savatchada mavjud",
    already_in_cart_title: "Diqqat!",
    already_in_cart_desc: "Bu mahsulot allaqachon savatchada mavjud",
    added_to_cart_title: "Qo'shildi!",
    added_to_cart_desc: "Mahsulot savatchaga qo'shildi",
    go_to_cart: "Savatga o'tish",
    admin_login: "Admin panel",
    username: "Login",
    password: "Parol",
    username_required: "Loginni kiriting",
    password_required: "Parolni kiriting",
    login: "Kirish",
    login_success: "Muvaffaqiyatli kirdingiz!",
    login_error: "Login yoki parol noto'g'ri",
    admin_dashboard: 'Admin panel',
    logout: "Chiqish",
    total_products: "Jami mahsulotlar",
    total_sold: "Sotilgan",
    remaining_products: "Qolgan",
    total_revenue: "Jami daromad",
    recent_orders: "So'nggi buyurtmalar",
    order_id: "Buyurtma ID",
    customer: "Xaridor",
    products: "Mahsulotlar",
    date: "Sana",
    order_success: 'Buyurtma muvaffaqiyatli yuborildi',
    order_success_desc: 'Buyurtmangiz qabul qilindi. Tez orada siz bilan bog\'lanamiz.',
    order_error: 'Xatolik yuz berdi',
    order_error_desc: 'Buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.',
    required: 'Majburiy maydon',
    processing: 'Yuborilmoqda...',
    monthly_sales: 'Oylik savdolar',
    product_stats: 'Mahsulotlar statistikasi',
    items: 'ta mahsulot',
    order_details: 'Buyurtma tafsilotlari',
    customer_name: 'Mijoz ismi',
    customer_phone: 'Telefon raqami',
    customer_address: 'Manzil',
    order_date: 'Buyurtma sanasi',
    ordered_items: 'Buyurtma qilingan mahsulotlar',
    export_excel: 'Excel-ga yuklash',
    show_qr: 'QR kodni ko\'rish',
    qr_code: 'QR kod',
    actions: 'Amallar',
    icon: 'Belgi',
    default_categories: 'Asosiy kategoriyalar',
    products: 'mahsulot',
    all_categories: 'Barcha kategoriyalar',
    delete: 'O\'chirish',
    add_to_cart: 'Savatga qo\'shish',
    manage_products: 'Mahsulotlarni boshqarish',
    add_product: "Mahsulot qo'shish",
    product_name: "Mahsulot nomi",
    enter_product_name: "Mahsulot nomini kiriting",
    category: "Kategoriya",
    select_category: "Kategoriyani tanlang",
    price: "Narx",
    enter_price: "Narxni kiriting",
    images: "Rasmlar",
    upload: "Yuklash",
    description: "Tavsif",
    enter_description: "Tavsifni kiriting",
    required_field: "Majburiy maydon",
    invalid_price: "Noto'g'ri narx",
    add_category: "Kategoriya qo'shish",
    category_name: "Kategoriya nomi",
    enter_category_name: "Kategoriya nomini kiriting",
    enter_icon: "Kategoriya belgisini kiriting",
    enter_icon_example: "Masalan: 👔 yoki 👗",
    category_already_exists: "Bu kategoriya allaqachon mavjud",
    category_added: "Kategoriya muvaffaqiyatli qo'shildi",
    products_count: "Mahsulotlar soni",
    currency: "so'm",
    about_us_title: {
      uz: "Biz haqimizda",
      ru: "О нас"
    },
    about_us_description: {
      uz: "Power.uz - sizning ishonchli do'kоningiz. Biz sifat va xizmat sifasini yuqori qo'yamiz.",
      ru: "Power.uz - ваш надежный магазин. Мы ставим качество и уровень обслуживания на первое место."
    },
    about_us: {
      uz: "Biz haqimizda",
      ru: "О нас"
    },
    our_mission: {
      uz: "Bizning Maqsadimiz",
      ru: "Наша Миссия"
    },
    mission_description: {
      uz: "Mijozlarimizga eng sifatli va qulay mahsulotlar taqdim etish, ularning ehtiyojlarini to'liq qondirish.",
      ru: "Предоставлять нашим клиентам самые качественные и удобные товары, полностью удовлетворяя их потребности."
    },
    our_values: {
      uz: "Bizning Qadriyatlarimiz",
      ru: "Наши Ценности"
    },
    value_1: {
      uz: "Mijozga hurmat",
      ru: "Уважение к клиенту"
    },
    value_2: {
      uz: "Sifatli xizmat",
      ru: "Качественный сервис"
    },
    value_3: {
      uz: "Doimiy rivodjlanish",
      ru: "Постоянное развитие"
    },
    our_team: {
      uz: "Bizning Jamoa",
      ru: "Наша Команда"
    },
    frequently_asked_questions: {
      uz: "Ko'p So'raladigan Savollar",
      ru: "Часто Задаваемые Вопросы"
    },
    faq_subtitle: {
      uz: "Sizni qiziqtirgan savollar ro'yxati. Agar javob topa olmagan bo'lsangiz, qo'llab-quvvatlash xizmatiga murojaat eting.",
      ru: "Список вопросов, которые вас интересуют. Если вы не нашли ответ, обратитесь в службу поддержки."
    },
    still_have_questions: {
      uz: "Hali ham savollaringiz bormi?",
      ru: "Остались вопросы?"
    },
    contact_support_text: {
      uz: "Qo'llab-quvvatlash xizmatimiz sizga yordam berishga tayyor.",
      ru: "Наша служба поддержки готова помочь вам."
    },
    contact_support: {
      uz: "Qo'llab-quvvatlash",
      ru: "Поддержка"
    },
    faq_question_1: {
      uz: "Buyurtmani qanday berish mumkin?",
      ru: "Как сделать заказ?"
    },
    faq_answer_1: {
      uz: "Mahsulotni tanlang, savatga qo'shing va checkout qismida kerakli ma'lumotlarni to'ldiring.",
      ru: "Выберите товар, добавьте его в корзину и заполните необходимые данные в разделе оформления заказа."
    },
    faq_question_2: {
      uz: "Yetkazib berish qanday amalga oshiriladi?",
      ru: "Как осуществляется доставка?"
    },
    faq_answer_2: {
      uz: "Biz barcha viloyatlarga 2-3 ish kuni ichida yetkazib beramiz. Yetkazib berish narxi mahsulot miqdoriga bog'liq.",
      ru: "Мы доставляем во все области в течение 2-3 рабочих дней. Стоимость доставки зависит от количества товара."
    },
    faq_question_3: {
      uz: "Mahsulotni qaytarish mumkinmi?",
      ru: "Можно ли вернуть товар?"
    },
    faq_answer_3: {
      uz: "Ha, 14 kun ichida sifatsiz yoki xohlagan mahsulotni qaytarish mumkin. Qaytarish shartlari bilan batafsil tanishishingiz mumkin.",
      ru: "Да, вы можете вернуть некачественный или любой другой товар в течение 14 дней. Подробнее с условиями возврата можно ознакомиться."
    },
    popular_products: {
      uz: "Ommabop Mahsulotlar",
      ru: "Популярные Товары"
    },
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
    placeOrder: 'Оформить заказ',
    men: 'Мужчины',
    women: 'Женщины',
    children: 'Дети',
    books: 'Книги',
    all_products: 'Все продукты',
    quality: 'Качество',
    price: 'Цена',
    delivery: 'Доставка',
    appliances: 'Бытовая техника',
    home: 'Главная',
    about: 'О нас',
    contact: 'Контакты',
    faq: 'Вопросы',
    categories: 'Категории',
    our_products: 'Наши продукты',
    fillAllFields: 'Пожалуйста, заполните все поля!',
    sendingOrder: 'Отправка заказа...',
    orderSuccess: 'Ваш заказ успешно отправлен!',
    orderConfirmation: 'Мы свяжемся с вами в ближайшее время.',
    newOrder: 'Сделать новый заказ',
    processing: 'Обработка...',
    add_to_cart: "Добавить в корзину",
    added_to_cart: "Добавлено",
    already_in_cart: "Уже в корзине",
    already_in_cart_title: "Внимание!",
    already_in_cart_desc: "Этот товар уже есть в корзине",
    added_to_cart_title: "Добавлено!",
    added_to_cart_desc: "Товар добавлен в корзину",
    go_to_cart: "Перейти в корзину",
    admin_login: "Админ панель",
    username: "Логин",
    password: "Пароль",
    username_required: "Введите логин",
    password_required: "Введите пароль",
    login: "Войти",
    login_success: "Успешный вход!",
    login_error: "Неверный логин или пароль",
    admin_dashboard: "Админ панель",
    logout: "Выйти",
    total_products: "Всего товаров",
    total_sold: "Продано",
    remaining_products: "Осталось",
    total_revenue: "Общий доход",
    recent_orders: "Последние заказы",
    order_id: "ID заказа",
    customer: "Покупатель",
    products: "Товары",
    total: "Итого",
    date: "Дата",
    order_success: 'Заказ успешно отправлен',
    order_success_desc: 'Ваш заказ принят. Мы свяжемся с вами в ближайшее время.',
    order_error: 'Произошла ошибка',
    order_error_desc: 'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.',
    required: 'Обязательное поле',
    processing: 'Отправка...',
    monthly_sales: 'Ежемесячные продажи',
    product_stats: 'Статистика продуктов',
    items: 'продуктов',
    order_details: 'Детали заказа',
    customer_name: 'Имя клиента',
    customer_phone: 'Номер телефона',
    customer_address: 'Адрес',
    order_date: 'Дата заказа',
    ordered_items: 'Заказанные товары',
    export_excel: 'Экспорт в Excel',
    show_qr: 'Показать QR код',
    qr_code: 'QR код',
    actions: 'Действия',
    icon: 'Значок',
    default_categories: 'Основные категории',
    products: 'товаров',
    all_categories: 'Все категории',
    delete: 'Удалить',
    add_to_cart: 'Добавить в корзину',
    manage_products: 'Управление продуктами',
    add_product: "Добавить продукт",
    product_name: "Название продукта",
    enter_product_name: "Введите название продукта",
    category: "Категория",
    select_category: "Выберите категорию",
    price: "Цена",
    enter_price: "Введите цену",
    images: "Изображения",
    upload: "Загрузить",
    description: "Описание",
    enter_description: "Введите описание",
    required_field: "Обязательное поле",
    invalid_price: "Неверная цена",
    add_category: "Добавить категорию",
    category_name: "Название категории",
    enter_category_name: "Введите название категории",
    enter_icon: "Введите значок категории",
    enter_icon_example: "Например: 👔 или 👗",
    category_already_exists: "Эта категория уже существует",
    category_added: "Категория успешно добавлена",
    products_count: "Количество товаров",
    currency: "сум",
    about_us_title: {
      uz: "Biz haqimizda",
      ru: "О нас"
    },
    about_us_description: {
      uz: "Power.uz - sizning ishonchli do'kоningiz. Biz sifat va xizmat sifasini yuqori qo'yamiz.",
      ru: "Power.uz - ваш надежный магазин. Мы ставим качество и уровень обслуживания на первое место."
    },
    about_us: {
      uz: "Biz haqimizda",
      ru: "О нас"
    },
    our_mission: {
      uz: "Bizning Maqsadimiz",
      ru: "Наша Миссия"
    },
    mission_description: {
      uz: "Mijozlarimizga eng sifatli va qulay mahsulotlar taqdim etish, ularning ehtiyojlarini to'liq qondirish.",
      ru: "Предоставлять нашим клиентам самые качественные и удобные товары, полностью удовлетворяя их потребности."
    },
    our_values: {
      uz: "Bizning Qadriyatlarimiz",
      ru: "Наши Ценности"
    },
    value_1: {
      uz: "Mijozga hurmat",
      ru: "Уважение к клиенту"
    },
    value_2: {
      uz: "Sifatli xizmat",
      ru: "Качественный сервис"
    },
    value_3: {
      uz: "Doimiy rivodjlanish",
      ru: "Постоянное развитие"
    },
    our_team: {
      uz: "Bizning Jamoa",
      ru: "Наша Команда"
    },
    frequently_asked_questions: {
      uz: "Ko'p So'raladigan Savollar",
      ru: "Часто Задаваемые Вопросы"
    },
    faq_subtitle: {
      uz: "Sizni qiziqtirgan savollar ro'yxati. Agar javob topa olmagan bo'lsangiz, qo'llab-quvvatlash xizmatiga murojaat eting.",
      ru: "Список вопросов, которые вас интересуют. Если вы не нашли ответ, обратитесь в службу поддержки."
    },
    still_have_questions: {
      uz: "Hali ham savollaringiz bormi?",
      ru: "Остались вопросы?"
    },
    contact_support_text: {
      uz: "Qo'llab-quvvatlash xizmatimiz sizga yordam berishga tayyor.",
      ru: "Наша служба поддержки готова помочь вам."
    },
    contact_support: {
      uz: "Qo'llab-quvvatlash",
      ru: "Поддержка"
    },
    faq_question_1: {
      uz: "Buyurtmani qanday berish mumkin?",
      ru: "Как сделать заказ?"
    },
    faq_answer_1: {
      uz: "Mahsulotni tanlang, savatga qo'shing va checkout qismida kerakli ma'lumotlarni to'ldiring.",
      ru: "Выберите товар, добавьте его в корзину и заполните необходимые данные в разделе оформления заказа."
    },
    faq_question_2: {
      uz: "Yetkazib berish qanday amalga oshiriladi?",
      ru: "Как осуществляется доставка?"
    },
    faq_answer_2: {
      uz: "Biz barcha viloyatlarga 2-3 ish kuni ichida yetkazib beramiz. Yetkazib berish narxi mahsulot miqdoriga bog'liq.",
      ru: "Мы доставляем во все области в течение 2-3 рабочих дней. Стоимость доставки зависит от количества товара."
    },
    faq_question_3: {
      uz: "Mahsulotni qaytarish mumkinmi?",
      ru: "Можно ли вернуть товар?"
    },
    faq_answer_3: {
      uz: "Ha, 14 kun ichida sifatsiz yoki xohlagan mahsulotni qaytarish mumkin. Qaytarish shartlari bilan batafsil tanishishingiz mumkin.",
      ru: "Да, вы можете вернуть некачественный или любой другой товар в течение 14 дней. Подробнее с условиями возврата можно ознакомиться."
    },
    popular_products: {
      uz: "Ommabop Mahsulotlar",
      ru: "Популярные Товары"
    },
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('uz');

  const t = (key) => {
    const translation = translations[currentLanguage][key];
    
    // If translation is an object with uz/ru keys, return the current language's value
    if (typeof translation === 'object' && (translation.uz || translation.ru)) {
      return translation[currentLanguage] || translation.uz || '';
    }
    
    return translation || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
