import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { t } = useLanguage();
  const [orderStatus, setOrderStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const sendOrderToTelegram = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      setOrderStatus("Iltimos, barcha ma'lumotlarni to'ldiring!");
      return;
    }

    if (cartItems.length === 0) {
      setOrderStatus("Savatingiz bo'sh!");
      return;
    }

    setIsLoading(true);
    const botToken = '7518400867:AAFuMR0JmrPtMAJIuu_-x4efo7_x4dqmYIQ';
    const chatId = '1167031824';

    const escapeMarkdown = (text) => {
      return text.toString().replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
    };

    let messageText = '🛍 Yangi buyurtma\\!\n\n';
    messageText += `👤 Xaridor: ${escapeMarkdown(customerInfo.name)}\n`;
    messageText += `📞 Telefon: ${escapeMarkdown(customerInfo.phone)}\n`;
    messageText += `📍 Manzil: ${escapeMarkdown(customerInfo.address)}\n\n`;
    messageText += '🛒 Buyurtma tarkibi:\n\n';

    cartItems.forEach((item, index) => {
      messageText += `${index + 1}\\. ${escapeMarkdown(item.name)}\n`;
      messageText += `   Narxi: ${escapeMarkdown(item.price.toLocaleString('uz-UZ'))} so'm\n`;
      messageText += `   Soni: ${item.quantity}\n`;
      messageText += `   Jami: ${escapeMarkdown((item.price * item.quantity).toLocaleString('uz-UZ'))} so'm\n\n`;
    });

    messageText += `💰 Umumiy summa: ${escapeMarkdown(calculateTotal().toLocaleString('uz-UZ'))} so'm`;

    try {
      setOrderStatus("Buyurtma yuborilmoqda...");
      
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText
        })
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setOrderStatus("success");
        clearCart();
        setCustomerInfo({ name: '', phone: '', address: '' });
      } else {
        throw new Error(data.description || 'Telegram API error');
      }
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      setOrderStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">{t('cart')}</h1>
      
      {cartItems.length === 0 && orderStatus !== "success" ? (
        <p className="text-gray-500 text-center">{t('cartEmpty')}</p>
      ) : orderStatus === "success" ? (
        <div className="text-center py-8">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Buyurtmangiz muvaffaqiyatli yuborildi!</h2>
          <p className="text-gray-600 mb-4">Tez orada siz bilan bog'lanamiz.</p>
          <button
            onClick={() => {
              setOrderStatus('');
              navigate('/');
            }}
            className="bg-[#2189FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Yangi buyurtma berish
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b py-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price.toLocaleString('uz-UZ')} so'm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-1 border-r"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border-l"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder={t('enterName')}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder={t('enterPhone')}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder={t('enterAddress')}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              {orderStatus === "error" && (
                <p className="text-sm text-red-600 mb-4">
                  Buyurtma yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.
                </p>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>{t('total')}:</span>
                  <span className="font-semibold">{calculateTotal().toLocaleString('uz-UZ')} so'm</span>
                </div>
                
                <button
                  onClick={sendOrderToTelegram}
                  disabled={isLoading}
                  className={`w-full bg-[#2189FF] text-white py-2 rounded transition-colors flex items-center justify-center ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Buyurtma yuborilmoqda...
                    </>
                  ) : (
                    t('placeOrder')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
