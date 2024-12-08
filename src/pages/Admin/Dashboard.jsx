import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Modal } from 'antd';
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
} from '@ant-design/icons';

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
      'Items': order.items.map(item => `${item.title} (${item.quantity})`).join(', '),
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('admin_dashboard')}</h1>
        <div className="space-x-4">
          {/* <Button
            type="primary"
            icon={<ShoppingOutlined />}
            onClick={() => navigate('/admin/products')}
          >
            {t('manage_products')}
          </Button> */}
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

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <InboxOutlined className="text-4xl text-blue-500 mb-2" />
            <h2 className="text-lg font-semibold">{t('total_products')}</h2>
            <p className="text-2xl">{stats.totalProducts}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <ShoppingCartOutlined className="text-4xl text-green-500 mb-2" />
            <h2 className="text-lg font-semibold">{t('total_sold')}</h2>
            <p className="text-2xl">{stats.totalSold}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <InboxOutlined className="text-4xl text-orange-500 mb-2" />
            <h2 className="text-lg font-semibold">{t('remaining_products')}</h2>
            <p className="text-2xl">{stats.remainingProducts}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <DollarOutlined className="text-4xl text-purple-500 mb-2" />
            <h2 className="text-lg font-semibold">{t('total_revenue')}</h2>
            <p className="text-2xl">{stats.totalRevenue.toLocaleString()} so'm</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={12}>
          <Card title={t('monthly_sales')}>
            <Line {...monthlyConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={t('product_stats')}>
            <Column {...productConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Kategoriyalar bo'yicha sotuvlar">
            <Pie {...categoryPieConfig} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card title="Kunlik daromad">
            <Bar {...dailyRevenueConfig} />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">{t('recent_orders')}</h2>
        <Table
          dataSource={getRecentOrders()}
          columns={columns}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Card>

      <Modal
        title={t('order_details')}
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p><strong>{t('order_id')}:</strong> {selectedOrder.id}</p>
            <p><strong>{t('customer_name')}:</strong> {selectedOrder.customerInfo?.name}</p>
            <p><strong>{t('customer_phone')}:</strong> {selectedOrder.customerInfo?.phone}</p>
            <p><strong>{t('customer_address')}:</strong> {selectedOrder.customerInfo?.address}</p>
            <p><strong>{t('order_date')}:</strong> {new Date(selectedOrder.date).toLocaleString('uz-UZ')}</p>
            <h3 className="mt-4 mb-2">{t('ordered_items')}:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.title} - {item.quantity} x {item.price.toLocaleString()} so'm = {(item.quantity * item.price).toLocaleString()} so'm
                </li>
              ))}
            </ul>
            <p className="mt-4"><strong>{t('total')}:</strong> {selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} so'm</p>
          </div>
        )}
      </Modal>

      <Modal
        title={t('qr_code')}
        open={qrModalVisible}
        onCancel={() => setQrModalVisible(false)}
        footer={null}
      >
        {currentQR && (
          <div className="text-center">
            <QRCodeSVG
              value={JSON.stringify(currentQR)}
              size={256}
              level="H"
              includeMargin={true}
            />
            <p className="mt-4">
              <strong>{t('order_id')}:</strong> {currentQR.id}<br />
              <strong>{t('customer_name')}:</strong> {currentQR.customer}<br />
              <strong>{t('total')}:</strong> {currentQR.total.toLocaleString()} so'm<br />
              <strong>{t('date')}:</strong> {currentQR.date}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
