import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSold: 0,
    remainingProducts: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
    calculateStats();
  }, [orders]);

  const calculateStats = () => {
    const totalSold = orders.reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);

    const totalRevenue = orders.reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, 0);

    // Demo uchun statik mahsulotlar soni
    const totalProducts = 150;
    const remainingProducts = totalProducts - totalSold;

    setStats({
      totalProducts,
      totalSold,
      remainingProducts,
      totalRevenue
    });
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: orders.length + 1,
      ...orderData,
      date: new Date().toISOString(),
      status: 'new'
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const getRecentOrders = (limit = 5) => {
    return [...orders]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const value = {
    orders,
    stats,
    addOrder,
    getRecentOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
