import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Login = ({
  handleSubmit, isLoggingIn,
}) => {
  const onFinish = (values) => {
    handleSubmit(values);
  };

  return (
    <>
      <h2>Login</h2>
      <Form
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[{
            required: true,
            message: 'Please input your Username!',
          }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Please input your Password!',
          }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoggingIn}
            disabled={isLoggingIn}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
          >
            {isLoggingIn ? 'Logging...' : 'Log in'}
          </Button>
          Or
          <Link to="/user/register" href="/user/register">Register</Link>
        </Form.Item>
      </Form>
    </>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

Login.defaultProps = {};

Login.styles = {};

export default Login;
