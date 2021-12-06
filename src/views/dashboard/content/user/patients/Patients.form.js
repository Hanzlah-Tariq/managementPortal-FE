import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';

import {
  Form, Input, Modal, Select, Spin,
} from 'antd';

import {
  arrayOfNumbers,
  CREATED, FETCHING, UPDATED, USER_STATE,
} from '../../../../../common/constants';

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
  employees,
  fetchEmployees,
  visibleAdd,
  setVisibleAdd,
  visibleUpdate,
  setVisibleUpdate,
  createPatient,
  updatePatient,
  patient,
  id,
  setId,
  statusUpdate,
  isFetchingEmployees,
  user,
  medicines,
  fetchAllMedicines,
}) => {
  const [imgData, setImgData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [imgPreview, setImgPreview] = useState(null);

  const [form] = Form.useForm();
  const {
    validateFields, resetFields, setFieldsValue, scrollToField,
  } = form;

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    user?.user?.typeOfId === USER_STATE.EMPLOYEE && fetchEmployees();
    // eslint-disable-next-line no-unused-expressions
    user?.user?.typeOfId === USER_STATE.ADMIN_PARTIAL && fetchAllMedicines();
  }, [user]);

  useEffect(() => {
    resetFields();
  }, [id]);

  const onAddSuccessClick = (values) => {
    createPatient(values, imgData);
    setImgData(null);
  };

  const onUpdateSuccessClick = (values) => {
    updatePatient(id, values, imgData);
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
        const addDoctor = { ...values, doctor: user?.user?.email };
        const modifyValues = user?.user?.typeOfId === USER_STATE.EMPLOYEE ? values : addDoctor;
        onAddSuccessClick(modifyValues);
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
    if (id && patient && patient.patient) {
      setFieldsValue({
        name: patient.patient.name,
        age: patient.patient.age,
        gender: patient.patient.gender,
        doctor: patient.patient.doctor,
      });
      if (patient?.patient?.medicines?.length > 0) {
        setFieldsValue({
          medicine: patient.patient.medicine,
          disease: patient.patient.disease,
        });
      }
    }
  }, 25);

  const onFinishFailed = ({ errorFields }) => {
    scrollToField(errorFields[0].name);
  };

  const nameRegex = new RegExp('^[a-z,A-Z ]{0,32}$');

  return (
    <Modal
      getContainer={false}
      title={visibleUpdate ? 'Update Patient Form' : 'Add Patient Form'}
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
        tip="Adding Patient"
        size="large"
      >
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
            <Input type="text" placeholder="Please Input" />
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
              filterOption={(input, option) => {
                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
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
          {
            user?.user?.typeOfId === USER_STATE.EMPLOYEE && (
              <Form.Item
                name="doctor"
                label="Doctor"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Select a doctor" allowClear disabled={isFetchingEmployees === FETCHING}>
                  {
                    employees?.employee?.filter((employee) => {
                      return employee?.designation === 'doctor';
                      // eslint-disable-next-line max-len
                    }).map((doctor) => <Option value={doctor.email} key={doctor.name}>{doctor.name}</Option>)
                  }
                </Select>
              </Form.Item>
            )
          }
          {
            user?.user?.typeOfId === USER_STATE.ADMIN_PARTIAL && (
              <>
                <Form.Item
                  name="medicine"
                  label="Medicine"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a medicine"
                    allowClear
                    mode="multiple"
                  >
                    {
                      medicines?.map((medicine) => {
                        return (
                          <Option value={medicine.medicine} key={medicine?._id}>
                            {/* eslint-disable-next-line max-len */}
                            {medicine.medicine?.charAt(0)?.toUpperCase() + medicine.medicine?.slice(1)}
                          </Option>
                        );
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item
                  name="disease"
                  label="Disease"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Please add disease" />
                </Form.Item>
              </>
            )
          }
        </Form>
      </Spin>
    </Modal>
  );
};

ModalView.defaultProps = {
  patient: null,
  id: '',
  user: {},
};

ModalView.propTypes = {
  createPatient: PropsTypes.func.isRequired,
  visibleAdd: PropsTypes.bool.isRequired,
  setVisibleAdd: PropsTypes.func.isRequired,
  fetchEmployees: PropsTypes.func.isRequired,
  visibleUpdate: PropsTypes.bool.isRequired,
  setVisibleUpdate: PropsTypes.func.isRequired,
  fetchAllMedicines: PropsTypes.func.isRequired,
  updatePatient: PropsTypes.func.isRequired,
  id: PropsTypes.string,
  statusUpdate: PropsTypes.string.isRequired,
  isFetchingEmployees: PropsTypes.string.isRequired,
  setId: PropsTypes.func.isRequired,
  patient: PropsTypes.object,
  user: PropsTypes.object,
  employees: PropsTypes.any.isRequired,
  medicines: PropsTypes.any.isRequired,
};

export default ModalView;
