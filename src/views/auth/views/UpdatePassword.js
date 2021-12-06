import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';

const UpdatePassword = ({ handleSubmit, isUpdatedPassword }) => {
  const onFinish = (values) => {
    handleSubmit(values);
  };

  const onClick = () => {
    window.location.reload();
  };
  return (
    <>
      {isUpdatedPassword && <Redirect to="/user/logout" />}
      <h2>Update Password</h2>
      <Form
        onFinish={onFinish}
      >
        <Form.Item
          name="currentpassword"
          rules={[{
            required: true,
            message: 'Please input your current Password!',
          }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Current Password"
          />
        </Form.Item>
        <Form.Item
          name="newpassword"
          rules={[{
            required: true,
            message: 'Please input your new Password!',
          }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item>

          <Link to="/user/forgot-password" href="/user/forgot-password" style={{ float: 'right' }}>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
          >
            Update Password
          </Button>
          <Link
            to="/user"
            onClick={onClick}
            type="secondary"
            style={{ width: '100%', marginTop: '11px' }}
          >
            Cancel
          </Link>
        </Form.Item>
      </Form>

    </>
  );
};

UpdatePassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isUpdatedPassword: PropTypes.bool.isRequired,
};

UpdatePassword.defaultProps = {};

UpdatePassword.styles = {};

export default UpdatePassword;
