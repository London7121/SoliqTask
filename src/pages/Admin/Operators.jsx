import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Table, Input, Button, Avatar, Row, Col, Statistic, Tag } from 'antd';
import { ShoppingCartOutlined, UserOutlined, PhoneOutlined, DollarOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Content, Sider } = Layout;
const { Search } = Input;

const Operators = () => {
  const [selectedMenu, setSelectedMenu] = useState('orders');
  const [customers, setCustomers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadData = () => {
      // Local storage-dan ma'lumotlarni olish
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Oxirgi 20 ta buyurtma
      const recent = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 20)
        .map(order => ({
          key: order.id,
          customer: order.customerInfo.name,
          phone: order.customerInfo.phone,
          items: order.items,
          total: order.total,
          date: order.date
        }));
      setRecentOrders(recent);

      // Mahsulotlar statistikasi
      const products = {};
      orders.forEach(order => {
        order.items?.forEach(item => {
          if (products[item.name]) {
            products[item.name].count += item.quantity;
            products[item.name].total += item.price * item.quantity;
          } else {
            products[item.name] = {
              name: item.name,
              count: item.quantity,
              total: item.price * item.quantity
            };
          }
        });
      });
      setProductStats(Object.values(products));
      

      // Mijozlar ma'lumotlarini yangilash
      const customerMap = new Map();
      orders.forEach(order => {
        if (!customerMap.has(order.userId)) {
          customerMap.set(order.userId, {
            key: order.userId,
            name: order.userName,
            phone: order.userPhone,
            orderCount: 1,
            totalSpent: order.totalAmount,
            lastOrder: order.createdAt
          });
        } else {
          const customer = customerMap.get(order.userId);
          customer.orderCount += 1;
          customer.totalSpent += order.totalAmount;
          if (new Date(order.createdAt) > new Date(customer.lastOrder)) {
            customer.lastOrder = order.createdAt;
          }
        }
      });
      setCustomers(Array.from(customerMap.values()));
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const stats = {
    totalOrders: recentOrders.length,
    totalCustomers: customers.length,
    totalRevenue: recentOrders.reduce((sum, order) => sum + order.total, 0)
  };
  

  const recentOrderColumns = [
    {
      title: 'Mijoz',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => (
        <>
          <Avatar icon={<UserOutlined />} /> {text}
          <div><small>{record.phone}</small></div>
        </>
      ),
    },
    {
      title: 'Buyurtma tarkibi',
      dataIndex: 'items',
      key: 'items',
      render: items => (
        <>
          {items?.map((item, index) => (
            <Tag color="blue" key={index}>
              {item.name} x{item.quantity}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Summa',
      dataIndex: 'total',
      key: 'total',
      render: value => `${value?.toLocaleString()} so'm`,
    },
    {
      title: 'Sana',
      dataIndex: 'date',
      key: 'date',
      render: date => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
    }
  ];

  const productColumns = [
    {
      title: 'Mahsulot',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sotilgan soni',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => b.count - a.count,
    },
    {
      title: 'Jami summa',
      dataIndex: 'total',
      key: 'total',
      render: value => `${value?.toLocaleString()} so'm`,
      sorter: (a, b) => b.total - a.total,
    }
  ];

  const customerColumns = [
    {
      title: 'Mijoz',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <>
          <Avatar icon={<UserOutlined />} /> {text}
          <div><small>{record.phone}</small></div>
        </>
      ),
    },
    {
      title: 'Buyurtmalar soni',
      dataIndex: 'orderCount',
      key: 'orderCount',
      sorter: (a, b) => b.orderCount - a.orderCount,
    },
    {
      title: 'Jami xarid',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: value => `${value?.toLocaleString()} so'm`,
      sorter: (a, b) => b.totalSpent - a.totalSpent,
    },
    {
      title: 'Oxirgi buyurtma',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      render: date => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(b.lastOrder) - new Date(a.lastOrder),
    },
    {
      title: 'Amallar',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<PhoneOutlined />}
          onClick={() => window.open(`tel:${record.phone}`)}
        >
          Qo'ng'iroq qilish
        </Button>
      ),
    }
  ];

  const renderStats = () => (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col span={8}>
        <Card>
          <Statistic
            title="Jami buyurtmalar"
            value={stats.totalOrders}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Mijozlar soni"
            value={stats.totalCustomers}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Umumiy savdo"
            value={stats.totalRevenue}
            prefix={<DollarOutlined />}
            suffix="so'm"
          />
        </Card>
      </Col>
    </Row>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'orders':
        return (
          <>
            {renderStats()}
            <Card title="Oxirgi 20 ta buyurtma" style={{ marginBottom: 24 }}>
              <Table
                dataSource={recentOrders}
                columns={recentOrderColumns}
                pagination={false}
              />
            </Card>
            <Card title="Mahsulotlar statistikasi">
              <Table
                dataSource={productStats}
                columns={productColumns}
                pagination={false}
              />
            </Card>
          </>
        );
      case 'customers':
        return (
          <>
            {renderStats()}
            <Card title="Mijozlar ro'yxati">
              <div style={{ marginBottom: 16 }}>
                <Search
                  placeholder="Mijozni qidirish..."
                  allowClear
                  style={{ width: 300 }}
                />
              </div>
              <Table
                dataSource={customers}
                columns={customerColumns}
              />
            </Card>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme={isDarkMode ? 'dark' : 'light'} width={200}>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            {
              key: 'orders',
              icon: <ShoppingCartOutlined />,
              label: 'Buyurtmalar'
            },
            {
              key: 'customers',
              icon: <UserOutlined />,
              label: 'Mijozlar'
            }
          ]}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Operators;
