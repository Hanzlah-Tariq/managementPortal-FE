import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import {
  ExclamationCircleOutlined,
  UserAddOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Tooltip,
} from 'antd';

import storage from '../../../../../common/storage';
import { USER_STATE } from '../../../../../common/constants';
import ModalView from './Employees.form';
import TableHeader from './views/tableHeader';

const { Content } = Layout;
const { confirm } = Modal;

const EmployeesView = ({
  createEmployee,
  fetchEmployees,
  fetchEmployee,
  updateEmployee,
  deleteEmployee,
  employee,
  employees,
  statusUpdate,
}) => {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [search, setSearch] = useState({ subString: '' });
  const [page, setPage] = useState({ current: 1 });
  const [id, setId] = useState('');
  const [radioButton, setRadioBtn] = useState('');

  const typeOfId = get(storage.get('user'), 'user.typeOfId');

  const status = {
    CREATED: 'CREATED',
    DELETED: 'DELETED',
    UPDATED: 'UPDATED',
  };

  useEffect(() => {
    fetchEmployees();
  }, [status[statusUpdate]]);

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content:
        'After this operation user will permanently deleted from database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteEmployee(itemId);
      },
    });
  };

  const showModalCreate = () => {
    setVisibleAdd(true);
  };

  const showModalUpdate = () => {
    setVisibleUpdate(true);
  };

  const handleSearch = (e) => {
    setSearch({ subString: e.target.value });
    setPage({
      current: 1,
    });
  };

  const handleClick = () => {
    setRadioBtn('');
  };

  const onRadioChange = (e) => setRadioBtn(e.target.value);

  return (
    <Content>
      <Row>
        <Col span={10}>
          {typeOfId === USER_STATE.ADMIN_FULL && (
            <Button type="primary" onClick={showModalCreate}>
              <UserAddOutlined />
              Add Employee
            </Button>
          )}
          <ModalView
            createEmployee={createEmployee}
            updateEmployee={updateEmployee}
            employee={employee}
            visibleAdd={visibleAdd}
            setVisibleAdd={setVisibleAdd}
            visibleUpdate={visibleUpdate}
            setVisibleUpdate={setVisibleUpdate}
            id={id}
            setId={setId}
            statusUpdate={statusUpdate}
          />
        </Col>
        <Col span={2} />
        <Col span={8} style={{ paddingLeft: '6px' }}>
          <Radio.Group onChange={onRadioChange} defaultValue="">
            <Radio.Button value="doctor">Doctor</Radio.Button>
            <Radio.Button value="compounder">Componder</Radio.Button>
            <Radio.Button value="receptionist">Receptionist</Radio.Button>
            <Radio.Button value="">All</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Input
              placeholder="Filter By Name"
              suffix={(
                <Tooltip title="Filtered Results">
                  <FilterOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              )}
              onChange={handleSearch}
              onClick={handleClick}
            />
          </Form.Item>
        </Col>
      </Row>
      <TableHeader
        statusUpdate={statusUpdate}
        employees={employees}
        setId={setId}
        showDeleteConfirm={showDeleteConfirm}
        showModalForUpdate={showModalUpdate}
        search={search}
        page={page}
        setPage={setPage}
        radioButton={radioButton}
      />
    </Content>
  );
};

EmployeesView.defaultProps = {
  employee: null,
};

EmployeesView.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
  fetchEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  employees: PropTypes.any.isRequired,
  employee: PropTypes.object,
  statusUpdate: PropTypes.string.isRequired,
};

export default EmployeesView;
