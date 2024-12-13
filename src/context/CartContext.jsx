import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const CartContext = createContext();

const MAX_CART_ITEMS = 20; // Maksimal savatga qo'shiladigan mahsulotlar soni

// Mahsulot nomini render qilish funksiyasi
const renderProductName = (product, currentLanguage = 'uz') => {
  // Agar product undefined bo'lsa, bo'sh satr qaytaramiz
  if (!product) return '';

  // Agar name ob'ekt bo'lsa, tilga qarab qiymatni olamiz
  if (typeof product.name === 'object') {
    return product.name[currentLanguage] ||
      product.name.uz ||
      product.name.ru ||
      '';
  }

  // Agar oddiy satr bo'lsa, uni qaytaramiz
  return String(product.name || '');
};

export const CartProvider = ({ children }) => {
  const { language } = useLanguage();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart).map(item => ({
        ...item,
        name: renderProductName(item, language)
      })) : [];
    } catch (error) {
      console.error("localStorage dan ma'lumot o'qishda xatolik:", error);
      return [];
    }
  });

  const [lastOrderId, setLastOrderId] = useState(() => {
    try {
      const savedId = localStorage.getItem('lastOrderId');
      return savedId ? parseInt(savedId) : 0;
    } catch (error) {
      console.error("localStorage dan oxirgi buyurtma ID sini o'qishda xatolik:", error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      // Savatdagi mahsulotlar sonini cheklash
      const limitedCartItems = cartItems.slice(0, MAX_CART_ITEMS);
      localStorage.setItem('cartItems', JSON.stringify(limitedCartItems));
    } catch (error) {
      console.error("localStorage ga ma'lumot yozishda xatolik:", error);
      // Agar localStorage to'lgan bo'lsa, eng so'nggi qo'shilgan mahsulotlarni saqlab qolish
      const limitedCartItems = cartItems.slice(-MAX_CART_ITEMS);
      localStorage.setItem('cartItems', JSON.stringify(limitedCartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('lastOrderId', lastOrderId.toString());
    } catch (error) {
      console.error("Oxirgi buyurtma ID sini saqlashda xatolik:", error);
    }
  }, [lastOrderId]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Agar savatda allaqachon shu mahsulot bo'lsa, uning sonini oshirish
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // Yangi mahsulotni tilga moslab qo'shish
      const newItem = {
        ...item,
        name: renderProductName(item, language),
        quantity: 1
      };

      // Agar savatda bo'sh o'rin bo'lsa, yangi mahsulotni qo'shish
      if (prevItems.length < MAX_CART_ITEMS) {
        return [...prevItems, newItem];
      }

      // Agar savat to'la bo'lsa, eng avvalgi mahsulotni o'chirib, yangi mahsulotni qo'shish
      return [...prevItems.slice(1), newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getNextOrderId = () => {
    const nextId = lastOrderId + 1;
    setLastOrderId(nextId);
    return nextId;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getNextOrderId
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
