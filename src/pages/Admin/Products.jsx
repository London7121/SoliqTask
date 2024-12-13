import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Popconfirm, Tabs, Select, Descriptions, Image, Menu } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined, AppstoreOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

// Mavjud mahsulotlar
import { ayollar } from '../../data/JS/ayollar';
import { bolalar } from '../../data/JS/bolalar';
import { erkaklar } from '../../data/JS/erkaklar';
import { kitoblar } from '../../data/JS/kitoblar';
import { maishiy_tex } from '../../data/JS/maishiy_tex';
import { yangi_yil } from '../../data/JS/yangi_yil';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  // Dark mode uchun stillar
  const darkModeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1f1f1f' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#000000',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },
    header: {
      color: isDarkMode ? '#ffffff' : '#000000',
      // borderBottom: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`
    },
    card: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
      border: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`
    }
  };

  // Table komponenti uchun dark mode
  const tableProps = {
    style: darkModeStyles.card,
    className: isDarkMode ? 'dark-table' : '',
  };

  // Modal komponenti uchun dark mode
  const modalProps = {
    style: darkModeStyles.card,
    className: isDarkMode ? 'dark-modal' : '',
  };

  // Barcha mavjud mahsulotlarni birlashtirish
  const existingProducts = [
    ...(ayollar || []).map(item => ({ ...item, category: 'Ayollar', image: item.images[0] })),
    ...(bolalar || []).map(item => ({ ...item, category: 'Bolalar', image: item.images[0] })),
    ...(erkaklar || []).map(item => ({ ...item, category: 'Erkaklar', image: item.images[0] })),
    ...(kitoblar || []).map(item => ({ ...item, category: 'Kitoblar', image: item.images[0] })),
    ...(maishiy_tex || []).map(item => ({ ...item, category: 'Maishiy texnika', image: item.images[0] })),
    ...(yangi_yil || []).map(item => ({ ...item, category: 'Yangi yil', image: item.images[0] }))
  ];

  // Kategoriyalar ro'yxati
  const categories = [
    'Ayollar',
    'Bolalar',
    'Erkaklar',
    'Kitoblar',
    'Maishiy texnika',
    'Yangi yil'
  ];

  // Filterlangan mahsulotlar
  const filteredProducts = selectedCategory === 'all'
    ? existingProducts
    : existingProducts.filter(product => product.category === selectedCategory);

  // Kategoriya o'zgarganda
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  // LocalStorage dan mahsulotlarni yuklash
  const fetchProducts = () => {
    setLoading(true);
    try {
      const storageProducts = {};
      categories.forEach(category => {
        const storageKey = `products_${category.toLowerCase().replace(' ', '_')}`;
        const savedProducts = localStorage.getItem(storageKey);
        if (savedProducts) {
          storageProducts[category] = JSON.parse(savedProducts);
        } else {
          storageProducts[category] = [];
        }
      });
      setProducts(storageProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Mahsulotlarni yuklashda xatolik yuz berdi');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Tanlangan mahsulotlarni o'chirish
  const handleBatchDelete = () => {
    try {
      const updatedProducts = {};
      categories.forEach(category => {
        const storageKey = `products_${category.toLowerCase().replace(' ', '_')}`;
        const savedProducts = localStorage.getItem(storageKey);
        if (savedProducts) {
          const categoryProducts = JSON.parse(savedProducts);
          updatedProducts[category] = categoryProducts.filter(p => !selectedRowKeys.includes(p.id));
          localStorage.setItem(storageKey, JSON.stringify(updatedProducts[category]));
        }
      });
      setProducts(updatedProducts);
      setSelectedRowKeys([]);
      message.success('Tanlangan mahsulotlar muvaffaqiyatli o\'chirildi');
    } catch (error) {
      console.error('Error deleting products:', error);
      message.error('Mahsulotlarni o\'chirishda xatolik yuz berdi');
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Rasm yuklash
  const handleUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  // Mahsulot qo'shish/tahrirlash
  const handleSubmit = async (values) => {
    try {
      const storageKey = `products_${values.category.toLowerCase().replace(' ', '_')}`;
      let categoryProducts = [];

      // Kategoriya mahsulotlarini olish
      try {
        const savedProducts = localStorage.getItem(storageKey);
        if (savedProducts) {
          categoryProducts = JSON.parse(savedProducts);
        }
      } catch (error) {
        console.error('Error loading category products:', error);
      }

      if (editingProduct) {
        // Mahsulotni yangilash
        categoryProducts = categoryProducts.map(product =>
          product.id === editingProduct.id
            ? {
              ...product,
              ...values,
              image: imageUrl || product.image,
              updatedAt: new Date().toISOString()
            }
            : product
        );
        message.success('Mahsulot muvaffaqiyatli yangilandi');
      } else {
        // Yangi mahsulot qo'shish
        const newProduct = {
          id: Date.now().toString(),
          ...values,
          image: imageUrl,
          createdAt: new Date().toISOString()
        };
        categoryProducts.push(newProduct);
        message.success('Mahsulot muvaffaqiyatli qo\'shildi');
      }

      // Kategoriya mahsulotlarini saqlash
      localStorage.setItem(storageKey, JSON.stringify(categoryProducts));

      setModalVisible(false);
      form.resetFields();
      setImageUrl('');
      fetchProducts(); // Mahsulotlarni qayta yuklash
    } catch (error) {
      console.error('Error saving product:', error);
      message.error('Mahsulotni saqlashda xatolik yuz berdi');
    }
  };

  // Mahsulotni o'chirish
  const handleDelete = (product) => {
    try {
      const storageKey = `products_${product.category.toLowerCase().replace(' ', '_')}`;
      const savedProducts = localStorage.getItem(storageKey);
      if (savedProducts) {
        const categoryProducts = JSON.parse(savedProducts);
        const updatedProducts = categoryProducts.filter(p => p.id !== product.id);
        localStorage.setItem(storageKey, JSON.stringify(updatedProducts));
        fetchProducts(); // Mahsulotlarni qayta yuklash
        message.success('Mahsulot muvaffaqiyatli o\'chirildi');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Mahsulotni o\'chirishda xatolik yuz berdi');
    }
  };

  // Mahsulot ma'lumotlarini ko'rish
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewModalVisible(true);
  };

  const columns = [
    {
      title: 'Rasm',
      dataIndex: 'image',
      key: 'image',
      render: (image) => image ? <img src={image} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : 'No image'
    },
    {
      title: 'Nomi',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => handleViewProduct(record)} style={{ color: isDarkMode ? '#1890ff' : '#1890ff' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Narxi',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${Number(price).toLocaleString()} so'm`
    },
    {
      title: 'Kategoriya',
      dataIndex: 'category',
      key: 'category',
    }
  ];

  const customColumns = [
    ...columns,
    {
      title: 'Amallar',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              setImageUrl(record.image);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Mahsulotni o'chirishni xohlaysizmi?"
            onConfirm={() => handleDelete(record)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      )
    }
  ];
  const navigate = useNavigate();


  return (
    <div className="p-6" style={darkModeStyles.container}>
      <div style={{
        position: 'fixed',
        top: 100,
        left: 0,
        right: 0,
        background: isDarkMode ? '#141414' : '#fff',
        zIndex: 1000,
        padding: '1.5rem',
        borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}>
        <Menu mode="horizontal" className="mb-6">
          <Menu.Item key="dashboard" icon={<AppstoreOutlined />} onClick={() => navigate('/admin')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="operators" icon={<UserOutlined />} onClick={() => navigate('/admin/operators')}>
            Operatorlar
          </Menu.Item>
        </Menu>
        <h1 className="text-2xl font-bold mb-6 my-2 text-[30px]" style={darkModeStyles.header}>
          Mahsulotlar boshqaruvi
        </h1>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Mavjud mahsulotlar" key="1">
            <div className="mb-4">
              <Select
                style={{ width: 200 }}
                value={selectedCategory}
                onChange={handleCategoryChange}
                placeholder="Kategoriyani tanlang"
                className={isDarkMode ? 'dark-select' : ''}
              >
                <Option value="all">Barcha mahsulotlar</Option>
                {categories.map(category => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
              <span className="ml-4" style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                Jami: {filteredProducts.length} ta mahsulot
              </span>
            </div>
            <Table
              {...tableProps}
              columns={columns}
              dataSource={filteredProducts}
              loading={loading}
              rowKey="id"
            />
          </TabPane>

          <TabPane tab="Qo'shilgan mahsulotlar" key="2">
            <div className="flex justify-between mb-4">
              <Popconfirm
                title="Tanlangan mahsulotlarni o'chirishni xohlaysizmi?"
                onConfirm={handleBatchDelete}
                okText="Ha"
                cancelText="Yo'q"
                disabled={selectedRowKeys.length === 0}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  disabled={selectedRowKeys.length === 0}
                  // className='dark:text-white'
                >
                  Tanlanganlarni o'chirish ({selectedRowKeys.length})
                </Button>
              </Popconfirm>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingProduct(null);
                  setImageUrl('');
                  form.resetFields();
                  setModalVisible(true);
                }}
              >
                Yangi mahsulot
              </Button>
            </div>

            <Table
              {...tableProps}
              rowSelection={rowSelection}
              columns={customColumns}
              dataSource={Object.values(products).flat()}
              loading={loading}
              rowKey="id"
            />
          </TabPane>
        </Tabs>

        {/* Mahsulot ma'lumotlarini ko'rsatish modali */}
        <Modal
          title={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Mahsulot ma'lumotlari</span>}
          visible={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
          width={700}
          className={isDarkMode ? 'dark-modal product-details-modal' : 'product-details-modal'}
        >
          {selectedProduct && (
            <div className="product-details">
              <div className="product-image-container">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ maxWidth: '300px', borderRadius: '8px' }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
            </div>

            <Descriptions
              bordered
              column={1}
              className={isDarkMode ? 'dark-descriptions' : ''}
              labelStyle={{
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#1f1f1f' : '#fafafa'
              }}
              contentStyle={{
                color: isDarkMode ? '#ffffff' : '#000000',
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff'
              }}
            >
              <Descriptions.Item label="Nomi">{selectedProduct.name}</Descriptions.Item>
              <Descriptions.Item label="Kategoriya">{selectedProduct.category}</Descriptions.Item>
              <Descriptions.Item label="Narxi">{selectedProduct.price} so'm</Descriptions.Item>
              <Descriptions.Item label="Tavsif">{selectedProduct.description || 'Tavsif mavjud emas'}</Descriptions.Item>
              <Descriptions.Item label="Yaratilgan sana">
                {new Date(selectedProduct.createdAt).toLocaleDateString('uz-UZ', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Descriptions.Item>
              {selectedProduct.updatedAt && (
                <Descriptions.Item label="Yangilangan sana">
                  {new Date(selectedProduct.updatedAt).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Descriptions.Item>
              )}
            </Descriptions>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="primary"
                onClick={() => {
                  setEditingProduct(selectedProduct);
                  setImageUrl(selectedProduct.image);
                  form.setFieldsValue(selectedProduct);
                  setViewModalVisible(false);
                  setModalVisible(true);
                }}
              >
                Tahrirlash
              </Button>
              <Popconfirm
                title="Mahsulotni o'chirishni xohlaysizmi?"
                onConfirm={() => {
                  handleDelete(selectedProduct);
                  setViewModalVisible(false);
                }}
                okText="Ha"
                cancelText="Yo'q"
              >
                <Button danger>O'chirish</Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        {...modalProps}
        title={editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Nomi</span>}
            rules={[{ required: true, message: 'Iltimos, mahsulot nomini kiriting' }]}
          >
            <Input className={isDarkMode ? 'dark-input' : ''} />
          </Form.Item>

          <Form.Item
            name="price"
            label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Narxi</span>}
            rules={[{ required: true, message: 'Iltimos, mahsulot narxini kiriting' }]}
          >
            <Input type="number" min={0} className={isDarkMode ? 'dark-input' : ''} />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Kategoriya</span>}
            rules={[{ required: true, message: 'Iltimos, kategoriyani tanlang' }]}
          >
            <Select className={isDarkMode ? 'dark-select' : ''}>
              {categories.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Tavsif</span>}
          >
            <Input.TextArea className={isDarkMode ? 'dark-input' : ''} />
          </Form.Item>

          <Form.Item label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Rasm</span>}>
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                handleUpload(file);
                return false;
              }}
              className={isDarkMode ? 'dark-upload' : ''}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingProduct ? 'Saqlash' : 'Qo\'shish'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </div>
  );
};

export default Products;
