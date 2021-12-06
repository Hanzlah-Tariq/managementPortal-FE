import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Input,
} from 'antd';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;

const ResendEmail = ({ isLoggingIn, handleSubmit }) => {
  const onFinish = (values) => {
    handleSubmit(values);
  };

  return [
    <h2 key={1}>Resend Email</h2>,
    <Form onFinish={onFinish} key={2}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'The input is not valid E-mail!' }]}
      >
        <Input
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <FormItem>
        <Button
          size="large"
          loading={isLoggingIn}
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {isLoggingIn ? 'Sending Email...' : 'Rsend Email'}
        </Button>
        Or
        {' '}
        <Link to="/user/login">Login</Link>
      </FormItem>
    </Form>,
  ];
};

ResendEmail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

export default ResendEmail;
