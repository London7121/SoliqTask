import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const success = login(values.username, values.password);
    
    if (success) {
      message.success(t('login_success'));
      navigate('/admin/dashboard');
    } else {
      message.error(t('login_error'));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">{t('admin_login')}</h1>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={t('username')}
            name="username"
            rules={[{ required: true, message: t('username_required') }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('password_required') }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="bg-[#2189FF]"
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
