import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';

interface LoginProps {
  onFinish: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onFinish }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleFinish = () => {
    onFinish(email, password);
    history.push('/app');
  };

  return (
    <Card>
      <Form onFinish={handleFinish}>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
