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
  Modal, Radio,
  Row,
  Tooltip,
  Badge,
} from 'antd';

import storage from '../../../../../common/storage';
import { USER_STATE } from '../../../../../common/constants';
import ModalView from './Patients.form';
import TableHeader from './views/tableHeader';

const { Content } = Layout;
const { confirm } = Modal;

const PatientsView = ({
  isFetchingEmployees,
  employees,
  fetchEmployees,
  createPatient,
  fetchPatients,
  fetchPatient,
  updatePatient,
  deletePatient,
  patient,
  patients,
  statusUpdate,
  user,
  medicines,
  fetchAllMedicines,
}) => {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [search, setSearch] = useState({ subString: '' });
  const [page, setPage] = useState({ current: 1 });
  const [id, setId] = useState('');
  const typeOfId = get(storage.get('user'), 'user.typeOfId');
  const [radioButton, setRadioBtn] = useState(
    // eslint-disable-next-line no-nested-ternary
    (typeOfId === USER_STATE.ADMIN_PARTIAL || typeOfId === USER_STATE.EMPLOYEE)
      ? 'pending'
      : typeOfId === USER_STATE.COMPOUNDER
        ? 'waiting'
        : '',
  );
  const [all, setAll] = useState(false);
  const [formatData, setFormatData] = useState('today');

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    all ? setFormatData('all') : setFormatData('today');
  }, [all]);

  const status = {
    CREATED: 'CREATED',
    DELETED: 'DELETED',
    UPDATED: 'UPDATED',
  };

  useEffect(() => {
    fetchPatients();
  }, [status[statusUpdate]]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeOfId === USER_STATE.ADMIN_FULL && fetchEmployees();
  }, []);

  useEffect(() => {
    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this patient?',
      icon: <ExclamationCircleOutlined />,
      content:
        'After this operation user will permanently deleted from database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePatient(itemId);
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

  const onSwitchChange = (state, recordId) => {
    // eslint-disable-next-line no-unused-expressions
    state && updatePatient(recordId, { status: 'completed' });
  };

  const onRadioChange = (e) => setRadioBtn(e.target.value);

  const onRadioTodayChange = (e) => (e.target.value === 'today' ? setAll(false) : setAll(true));

  const getBadgeLength = (badgeOf) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    const filterByDate = all
      ? typeOfId === USER_STATE.ADMIN_FULL && patients?.patient
      : patients?.patient?.filter((item) => {
        return item?.joinDate === today;
      });

    const filteredData = typeOfId === USER_STATE.ADMIN_PARTIAL
      ? filterByDate?.filter((item) => item?.user === user?.user?.id)
      : filterByDate;

    if (filteredData?.length > 0) {
      if (badgeOf === 'pending') {
        return filteredData?.filter((item) => item.status === 'pending').length;
      } if (badgeOf === 'waiting') {
        return filteredData?.filter((item) => item.status === 'waiting').length;
      }
    }
    return 0;
  };

  return (
    <Content>
      <Row>
        <Col span={10}>
          {(typeOfId === USER_STATE.ADMIN_PARTIAL || typeOfId === USER_STATE.EMPLOYEE) && (
            <Button type="primary" onClick={showModalCreate}>
              <UserAddOutlined />
              Add patient
            </Button>
          )}
          <ModalView
            createPatient={createPatient}
            updatePatient={updatePatient}
            patient={patient}
            visibleAdd={visibleAdd}
            setVisibleAdd={setVisibleAdd}
            visibleUpdate={visibleUpdate}
            setVisibleUpdate={setVisibleUpdate}
            id={id}
            setId={setId}
            statusUpdate={statusUpdate}
            fetchEmployees={fetchEmployees}
            employees={employees}
            isFetchingEmployees={isFetchingEmployees}
            user={user}
            medicines={medicines}
            fetchAllMedicines={fetchAllMedicines}
          />
        </Col>
        <Col span={2} />
        <Col span={8} style={{ paddingLeft: '150px' }}>
          {
            typeOfId === USER_STATE.ADMIN_FULL && (
              <Radio.Group onChange={onRadioTodayChange} defaultValue="today" value={formatData}>
                <Radio.Button value="today">Today</Radio.Button>
                <Radio.Button value="all">All</Radio.Button>
              </Radio.Group>
            )
          }
          {
            typeOfId === USER_STATE.ADMIN_PARTIAL && (
              <Radio.Group onChange={onRadioChange} defaultValue="pending">
                <Radio.Button value="pending">
                  Pending
                  <Badge count={getBadgeLength('pending')} style={{ backgroundColor: '#369be5' }} offset={[6, -3]} />
                </Radio.Button>
                <Radio.Button value="waiting">
                  Waiting
                  <Badge count={getBadgeLength('waiting')} style={{ backgroundColor: '#369be5' }} offset={[6, -3]} />
                </Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
              </Radio.Group>
            )
          }
          {
            typeOfId === USER_STATE.COMPOUNDER && (
              <Radio.Group onChange={onRadioChange} defaultValue="waiting">
                <Radio.Button value="waiting">
                  Waiting
                  <Badge count={getBadgeLength('waiting')} style={{ backgroundColor: '#369be5' }} offset={[6, -3]} />
                </Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
              </Radio.Group>
            )
          }
          {
            typeOfId === USER_STATE.EMPLOYEE && (
              <Radio.Group onChange={onRadioChange} defaultValue="pending">
                <Radio.Button value="pending">
                  Doctor
                  <Badge count={getBadgeLength('pending')} style={{ backgroundColor: '#369be5' }} offset={[6, -3]} />
                </Radio.Button>
                <Radio.Button value="waiting">
                  Medicine
                  <Badge count={getBadgeLength('waiting')} style={{ backgroundColor: '#369be5' }} offset={[6, -3]} />
                </Radio.Button>
                <Radio.Button value="completed">Completed</Radio.Button>
              </Radio.Group>
            )
          }
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
        patients={patients}
        setId={setId}
        showDeleteConfirm={showDeleteConfirm}
        showModalForUpdate={showModalUpdate}
        search={search}
        page={page}
        setPage={setPage}
        radioButton={radioButton}
        user={user}
        onSwitchChange={onSwitchChange}
        all={all}
        employees={employees}
        isFetchingEmployees={isFetchingEmployees}
        setAll={setAll}
      />
    </Content>
  );
};

PatientsView.defaultProps = {
  patient: null,
  user: {},
};

PatientsView.propTypes = {
  createPatient: PropTypes.func.isRequired,
  fetchPatients: PropTypes.func.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  updatePatient: PropTypes.func.isRequired,
  deletePatient: PropTypes.func.isRequired,
  fetchAllMedicines: PropTypes.func.isRequired,
  patients: PropTypes.any.isRequired,
  employees: PropTypes.any.isRequired,
  medicines: PropTypes.any.isRequired,
  patient: PropTypes.object,
  user: PropTypes.object,
  statusUpdate: PropTypes.string.isRequired,
  isFetchingEmployees: PropTypes.string.isRequired,
};

export default PatientsView;
