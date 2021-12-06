import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';

import {
  Col, Form, Input, Modal, Row, Select, Spin,
} from 'antd';

import ImageHandle from './views/imageHandle';
// eslint-disable-next-line no-unused-vars
import { CREATED, UPDATED, arrayOfNumbers } from '../../../../../common/constants';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

const ModalView = ({
  visibleAdd,
  setVisibleAdd,
  visibleUpdate,
  setVisibleUpdate,
  createEmployee,
  updateEmployee,
  employee,
  id,
  setId,
  statusUpdate,
}) => {
  const [imgData, setImgData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const [form] = Form.useForm();
  const {
    validateFields, resetFields, setFieldsValue, scrollToField,
  } = form;

  useEffect(() => {
    resetFields();
  }, []);

  const onAddSuccessClick = (values) => {
    createEmployee(values, imgData);
    setImgData(null);
  };

  const onUpdateSuccessClick = (values) => {
    updateEmployee(id, values, imgData);
    setImgData(null);
  };

  const handleCancelAdd = () => {
    resetFields();
    setImgPreview(null);
    setVisibleAdd(false);
    setImgData(null);
  };

  const handleCancelUpdate = () => {
    resetFields();
    setVisibleUpdate(false);
    setImgPreview(null);
    setImgData(null);
    setId(undefined);
  };

  useEffect(() => {
    if (statusUpdate === CREATED) {
      handleCancelAdd();
    } else if (statusUpdate === UPDATED) {
      handleCancelUpdate();
    }
  }, [statusUpdate]);

  const handleSubmitAdd = () => {
    validateFields()
      .then((values) => {
        onAddSuccessClick(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleSubmitUpdate = () => {
    validateFields()
      .then((values) => {
        onUpdateSuccessClick(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setId(undefined);
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  setTimeout(() => {
    if (id && employee && employee.employee) {
      setFieldsValue({
        name: employee.employee.name,
        email: employee.employee.email,
        gender: employee.employee.gender,
        age: employee.employee.age,
        designation: employee.employee.designation,
      });
      // eslint-disable-next-line no-unused-expressions,max-len
      employee?.employee?.address !== 'undefined' && setFieldsValue({ address: employee?.employee?.address });
    }
  }, 25);

  const onFinishFailed = ({ errorFields }) => {
    scrollToField(errorFields[0].name);
  };

  const nameRegex = new RegExp('^[a-z,A-Z ]{0,32}$');

  return (
    <Modal
      getContainer={false}
      title={visibleUpdate ? 'Update Employee Form' : 'Add Employee Form'}
      visible={visibleAdd || visibleUpdate}
      onOk={visibleUpdate ? handleSubmitUpdate : handleSubmitAdd}
      okText={visibleUpdate ? 'Update' : 'Add'}
      confirmLoading={confirmLoading}
      onCancel={visibleUpdate ? handleCancelUpdate : handleCancelAdd}
      maskClosable={false}
      afterClose={() => resetFields()}
    >
      <Spin
        spinning={confirmLoading}
        tip="Adding Employee"
        size="large"
      >
        <Row>
          <Col span={10} />
          <Col span={14}>
            <ImageHandle
              setImgData={setImgData}
              imgPreview={imgPreview}
              setImgPreview={setImgPreview}
            />
          </Col>
        </Row>
        <Form
          labelCol={layout.labelCol}
          wrapperCol={layout.wrapperCol}
          form={form}
          name="nest-messages"
          onFinish={visibleUpdate ? onUpdateSuccessClick : onAddSuccessClick}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
              {
                pattern: nameRegex,
                message: 'Name should contain only alphabets and less then 32 characters',
              },
            ]}
          >
            <Input placeholder="Please Input" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              placeholder="Please select age"
            >
              {
                arrayOfNumbers()?.age.map((age) => <Option key={age} value={age}>{age}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a gender" allowClear>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a designation" allowClear>
              <Option value="doctor">Doctor</Option>
              <Option value="compounder">Componder</Option>
              <Option value="receptionist">Receptionist</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
          >
            <Input.TextArea placeholder="Please add address" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

ModalView.defaultProps = {
  employee: null,
  id: '',
};

ModalView.propTypes = {
  createEmployee: PropsTypes.func.isRequired,
  visibleAdd: PropsTypes.bool.isRequired,
  setVisibleAdd: PropsTypes.func.isRequired,
  visibleUpdate: PropsTypes.bool.isRequired,
  setVisibleUpdate: PropsTypes.func.isRequired,
  updateEmployee: PropsTypes.func.isRequired,
  id: PropsTypes.string,
  statusUpdate: PropsTypes.string.isRequired,
  setId: PropsTypes.func.isRequired,
  employee: PropsTypes.object,
};

export default ModalView;
