import React, { useState } from 'react';
import { Button, Input, Form, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

// import emptyCartGif from '../assets/empty-cart.gif';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getNextOrderId } = useCart();
  const { t } = useLanguage();
  const { addOrder } = useOrders();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSubmitOrder = async (values) => {
    setLoading(true);
    try {
      const orderId = getNextOrderId(); // Buyurtma ID sini olish
      const orderDate = new Date();
      const formattedDate = orderDate.toLocaleDateString('uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const formattedTime = orderDate.toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const orderData = {
        id: orderId,
        items: cartItems,
        customerInfo: {
          name: values.name,
          phone: values.phone,
          address: values.address
        },
        total: totalPrice,
        date: orderDate.toISOString()
      };

      // Buyurtmani OrderContext-ga qo'shish
      addOrder(orderData);

      // Telegram bot uchun xabar tayyorlash
      const message = `🛍 Yangi buyurtma!\n\n` +
        `🆔 Buyurtma raqami: #${orderId}\n` +
        `📅 Sana: ${formattedDate}\n` +
        `⏰ Vaqt: ${formattedTime}\n\n` +
        `👤 Mijoz: ${values.name}\n` +
        `📞 Tel: ${values.phone}\n` +
        `📍 Manzil: ${values.address}\n\n` +
        `📦 Buyurtma tarkibi:\n` +
        cartItems.map(item => `- ${item.title || item.name || 'Noma\'lum mahsulot'} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm`).join('\n') +
        `\n\n💰 Jami: ${totalPrice.toLocaleString()} so'm`;

      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      // Local storage-ga buyurtmani saqlash
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push({
        userId: Date.now().toString(),
        userName: values.name,
        userPhone: values.phone,
        address: values.address,
        items: cartItems,
        totalAmount: totalPrice,
        status: 'new',
        createdAt: new Date()
      });
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      notification.success({
        message: t('order_success'),
        description: t('order_success_desc'),
      });

      form.resetFields();
      clearCart();
    } catch (error) {
      notification.error({
        message: t('order_error'),
        description: t('order_error_desc'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-[#0B2441] dark:text-white">{t('cart')}</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          {/* <div style={{ textAlign: 'center', padding: '50px' }}> */}
            <Empty
              // image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRF-1pAYQsso3W1JR0jqT_a78n9LVXZ3Bazg&s" 
              imageStyle={{
                height: 200,
              }}
              description={null}
            />
          {/* </div> */}
          <p className="text-[#0B2441] text-lg dark:text-white">{t('cartEmpty')}</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || item.images?.[0] || 'default-image-url'}
                    alt={item.title || item.name || 'Mahsulot'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.title || item.name || 'Noma\'lum mahsulot'}</h3>
                    <p className="text-gray-500">{item.price.toLocaleString()} so'm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-4 text-[#2189FF]">{t('orderSummary')}</h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitOrder}
              >
                <Form.Item
                  name="name"
                  label={t('enterName')}
                  className='dark:text-white'
                  labelStyle={{ color: 'red' }}
                  rules={[{ required: true, message: t('required') }]}
                >
                  <Input placeholder={t('enterName')} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label={t('enterPhone')}
                  rules={[{ required: true, message: t('required') }]}
                >
                  <Input placeholder={t('enterPhone')} />
                </Form.Item>

                <Form.Item
                  name="address"
                  label={t('enterAddress')}
                  rules={[{ required: true, message: t('required') }]}
                >
                  <Input.TextArea placeholder={t('enterAddress')} rows={3} />
                </Form.Item>

                <div className="flex justify-between font-bold mb-4 ">
                  <span>{t('total')}:</span>
                  <span>{totalPrice.toLocaleString()} so'm</span>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full bg-[#2189FF] text-white py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    {loading ? t('processing') : t('placeOrder')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
