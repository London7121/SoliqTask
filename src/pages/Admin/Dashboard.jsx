import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Modal, Menu, Statistic } from 'antd';
import { Line, Column, Pie, Bar } from '@ant-design/plots';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useLanguage } from '../../context/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import * as XLSX from 'xlsx';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  InboxOutlined,
  DownloadOutlined,
  QrcodeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined
} from '@ant-design/icons';

/**
 * Admin panel's dashboard page.
 *
 * This page shows the admin an overview of the store's sales, including
 * the total number of products, total number of sold products, remaining
 * products, and total revenue. It also shows a list of recent orders
 * and allows the admin to view the details of each order.
 *
 * The page also includes a QR code generator for each order, which can
 * be used to quickly view the order details.
 */
const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { stats, getRecentOrders, orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [currentQR, setCurrentQR] = useState(null);

  // Oylik statistika uchun ma'lumotlarni tayyorlash
  const getMonthlyData = () => {
    const monthlyStats = {};
    orders.forEach(order => {
      const date = new Date(order.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!monthlyStats[monthYear]) {
        monthlyStats[monthYear] = {
          month: monthYear,
          sales: 0,
          revenue: 0,
        };
      }
      monthlyStats[monthYear].sales += order.items.reduce((sum, item) => sum + item.quantity, 0);
      monthlyStats[monthYear].revenue += order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });
    return Object.values(monthlyStats);
  };

  // Mahsulotlar bo'yicha statistika
  const getProductStats = () => {
    const productStats = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productStats[item.title]) {
          productStats[item.title] = {
            name: item.title,
            quantity: 0,
            revenue: 0,
          };
        }
        productStats[item.title].quantity += item.quantity;
        productStats[item.title].revenue += item.price * item.quantity;
      });
    });
    return Object.values(productStats);
  };

  // Kategoriyalar bo'yicha sotuvlar
  const getCategoryStats = () => {
    const categoryStats = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const category = item.category || 'Boshqa';
        if (!categoryStats[category]) {
          categoryStats[category] = {
            type: category,
            value: 0,
            revenue: 0
          };
        }
        categoryStats[category].value += item.quantity;
        categoryStats[category].revenue += item.price * item.quantity;
      });
    });
    return Object.values(categoryStats);
  };

  // Kunlik daromad
  const getDailyRevenue = () => {
    const dailyStats = {};
    orders.forEach(order => {
      const date = new Date(order.date).toLocaleDateString('uz-UZ');
      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          revenue: 0,
          orders: 0
        };
      }
      dailyStats[date].revenue += order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      dailyStats[date].orders += 1;
    });
    return Object.values(dailyStats);
  };

  // Excel export funksiyasi
  const exportToExcel = () => {
    // Ma'lumotlarni tayyorlash
    const data = orders.map(order => ({
      'Order ID': order.id,
      'Customer Name': order.customerInfo?.name || '-',
      'Phone': order.customerInfo?.phone || '-',
      'Address': order.customerInfo?.address || '-',
      'Products': order.items.length,
      'Total Amount': order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      'Date': new Date(order.date).toLocaleDateString('uz-UZ'),
      'Items': order.items.map(item => `${item.name || item.title || 'Nomsiz mahsulot'} (${item.quantity}x${item.price})`).join(', '),
    }));

    // Excel yaratish
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    // Faylni yuklab olish
    XLSX.writeFile(wb, 'orders.xlsx');
  };

  // QR kod yaratish funksiyasi
  const showQRCode = (order) => {
    const orderData = {
      id: order.id,
      customer: order.customerInfo?.name,
      total: order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date(order.date).toLocaleDateString('uz-UZ'),
    };
    setCurrentQR(orderData);
    setQrModalVisible(true);
  };

  const categoryPieConfig = {
    data: getCategoryStats(),
    angleField: 'revenue',
    colorField: 'type',
    radius: 0.8,
    color: [
      '#2189FF',   // Moviy
      '#52C41A',   // Yashil
      '#FA8C16',   // Qizil-sariq
      '#1890FF',   // Och ko'k
      '#722ED1',   // Binafsha
      '#EB2F96',   // Pushti
      '#13C2C2',   // Yashil-ko'k
    ],
    label: {
      text: 'type',
      position: 'spider',
      style: {
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#333',
      }
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const dailyRevenueConfig = {
    data: getDailyRevenue(),
    xField: 'date',
    yField: 'revenue',
    seriesField: 'type',
    color: [
      '#2189FF',   // Moviy
      '#52C41A',   // Yashil
      '#FA8C16',   // Qizil-sariq
      '#1890FF',   // Och ko'k
      '#722ED1',   // Binafsha
    ],
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
        fontSize: 12,
      },
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  const monthlyConfig = {
    data: getMonthlyData(),
    xField: 'month',
    yField: 'revenue',
    seriesField: 'type',
    color: [
      '#2189FF',   // Moviy
      '#52C41A',   // Yashil
      '#FA8C16',   // Qizil-sariq
      '#1890FF',   // Och ko'k
      '#722ED1',   // Binafsha
    ],
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: '#2189FF',
        stroke: '#fff',
        lineWidth: 2,
      }
    },
    lineStyle: {
      lineWidth: 3,
      lineDash: [4, 4],
    },
  };

  const productConfig = {
    data: getProductStats(),
    xField: 'name',
    yField: 'quantity',
    color: [
      '#2189FF',   // Moviy
      '#52C41A',   // Yashil
      '#FA8C16',   // Qizil-sariq
      '#1890FF',   // Och ko'k
      '#722ED1',   // Binafsha
    ],
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.8,
        fontSize: 12,
        fontWeight: 'bold',
      },
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  const columns = [
    {
      title: t('order_id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('customer'),
      dataIndex: 'customerInfo',
      key: 'customer',
      render: (customerInfo) => customerInfo?.name || '-',
    },
    {
      title: t('products'),
      dataIndex: 'items',
      key: 'products',
      render: (items, record) => {
        return (
          <Button type="link" onClick={() => setSelectedOrder(record)}>
            {items?.length || 0} {t('items')}
          </Button>
        );
      },
    },
    {
      title: t('total'),
      dataIndex: 'items',
      key: 'total',
      render: (items) => {
        const total = items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
        return `${total.toLocaleString()} so'm`;
      },
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString('uz-UZ'),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<QrcodeOutlined />}
          onClick={() => showQRCode(record)}
        >
          {t('show_qr')}
        </Button>
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="p-6 dark:bg-gray-950">
      <div style={{
        position: 'fixed',
        top: 100,
        left: 0,
        right: 0,
        background: '#fff',
        zIndex: 1000,
        padding: '1.5rem',
        borderBottom: `1px solid #f0f0f0`
      }}>
        <Menu mode="horizontal" className="mb-6">
          <Menu.Item key="products" icon={<ShoppingOutlined />} onClick={() => navigate('/admin/products')}>
            Mahsulotlar
          </Menu.Item>
        </Menu>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-gray-900">{t('admin_dashboard')}</h1>
        <div className="space-x-4">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={exportToExcel}
          >
            {t('export_excel')}
          </Button>
          <Button type="primary" danger onClick={handleLogout}>
            {t('logout')}
          </Button>
        </div>
      </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Row gutter={[16, 16]}>
          {/* Statistika kartalari */}
          <Col xs={24} sm={12} lg={6}>
            <Card
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Statistic
                title={<span style={{ color: '#000000' }}>Jami mahsulotlar</span>}
                value={stats.totalProducts}
                prefix={<ShoppingOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Statistic
                title={<span style={{ color: '#000000' }}>Faol foydalanuvchilar</span>}
                value={93}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Statistic
                title={<span style={{ color: '#000000' }}>Bugungi buyurtmalar</span>}
                value={12}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Statistic
                title={<span style={{ color: '#000000' }}>Jami daromad</span>}
                value={9280}
                prefix={<DollarOutlined />}
                suffix="so'm"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>

          {/* Grafik */}
          <Col xs={24} lg={16}>
            <Card
              title={<span style={{ color: '#000000' }}>Sotuvlar statistikasi</span>}
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Line {...monthlyConfig} />
            </Card>
          </Col>

          {/* Pie Chart */}
          <Col xs={24} lg={8}>
            <Card
              title={<span style={{ color: '#000000' }}>Kategoriyalar bo'yicha</span>}
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Pie {...categoryPieConfig} />
            </Card>
          </Col>

          {/* So'nggi buyurtmalar */}
          <Col span={24}>
            <Card
              title={<span style={{ color: '#000000' }}>So'nggi buyurtmalar</span>}
              className=""
              style={{
                background: '#fff',
                borderColor: '#f0f0f0'
              }}
            >
              <Table
                dataSource={getRecentOrders()}
                columns={columns}
                pagination={false}
                className=""
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
