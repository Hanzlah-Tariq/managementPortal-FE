import { omit, get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Tag, Switch, Button, message, Modal, DatePicker, Select, Row, Col, Typography,
} from 'antd';
import {
  DeleteOutlined, FormOutlined, CloseOutlined, CheckOutlined,
} from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { FETCHING, UPDATING, USER_STATE } from '../../../../../../common/constants';
import storage from '../../../../../../common/storage';
import List from '../Patients.List.view';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const patientStatus = {
  waiting: 'Waiting',
  pending: 'Pending',
  completed: 'Completed',
};

const TableHeader = ({
  patients,
  showDeleteConfirm,
  showModalForUpdate,
  setId,
  search,
  page,
  statusUpdate,
  setPage,
  radioButton,
  onSwitchChange,
  user,
  all,
  employees,
  isFetchingEmployees,
  setAll,
}) => {
  const [doctor, setDoctor] = useState('');
  const [datePicker, setDatePicker] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const typeOfId = get(storage.get('user'), 'user.typeOfId');

  useEffect(() => {
    if (datePicker.includes('')) {
      setDatePicker([]);
    }
  }, [datePicker]);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  const filterByDate = all
    ? typeOfId === USER_STATE.ADMIN_FULL && patients?.patient
    : patients?.patient?.filter((patient) => {
      return patient?.joinDate === today;
    });

  const filteredData = typeOfId === USER_STATE.ADMIN_PARTIAL
    ? filterByDate?.filter((patient) => patient?.user === user?.user?.id)
    : filterByDate;

  let data = filteredData?.length > 0
    ? filteredData.map((row) => ({
      Name: row.name.charAt(0).toUpperCase() + row.name.slice(1),
      Gender: row.gender.charAt(0).toUpperCase() + row.gender.slice(1),
      Doctor: row.doctor.charAt(0).toUpperCase() + row.doctor.slice(1),
      Medicine: row.medicine,
      Status: row.status,
      date: row.joinDate,
      doctor: row.doctor,
      // eslint-disable-next-line prefer-template
      joinDate: row.joinDate + ' ' + row.time,
      Sr: typeOfId === USER_STATE.ADMIN_FULL ? row.adminSerial : row.serial,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
    }))
    : [];

  data = data.filter((item) => (radioButton
    ? item.Status.includes(radioButton)
    : item.Name.toLowerCase().includes(search.subString.toLowerCase())));

  data = data.sort((a, b) => b.Sr - a.Sr);

  const patientLength = patients ? patients.length : 0;

  const receptionistColumns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        typeOfId === USER_STATE.EMPLOYEE ? text : <Link to={`/dashboard/user/patient/${record.Id}`}>{text}</Link>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Doctor',
      dataIndex: 'Doctor',
      key: 'Doctor',
    },
    {
      title: 'Date',
      dataIndex: 'joinDate',
      key: 'JoinDate',
    },
  ];

  if (typeOfId === USER_STATE.ADMIN_FULL) {
    receptionistColumns.push({
      title: 'Status',
      key: 'Actions',
      render: (record) => (<Text>{patientStatus[record.Status]}</Text>),
    });
  } else if (typeOfId === USER_STATE.EMPLOYEE) {
    receptionistColumns.push({
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <FormOutlined
            style={
              {
                fontSize: '18px',
                color: (record?.Status === 'completed' || record?.Status === 'waiting') ? '#95de64' : 'green',
                pointerEvents: (record?.Status === 'completed' || record?.Status === 'waiting') ? 'none' : 'auto',
              }
            }
            onClick={() => {
              showModalForUpdate();
              setId(record.Id);
            }}
          />
        </span>
      ),
    });
  }

  const doctorColumns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <Link to={`/dashboard/user/patient/${record.Id}`}>{text}</Link>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Medicine',
      dataIndex: 'Medicine',
      key: 'Medicine',
      align: 'center',
      width: 500,
      render: (text) => text.map((item) => <Tag color="blue">{item}</Tag>),
    },
    {
      title: 'Date',
      dataIndex: 'joinDate',
      key: 'JoinDate',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <FormOutlined
            style={
              {
                fontSize: '18px',
                color: record?.Status === 'completed' ? '#95de64' : 'green',
                pointerEvents: record?.Status === 'completed' ? 'none' : 'auto',
              }
            }
            onClick={() => {
              showModalForUpdate();
              setId(record.Id);
            }}
          />
          <DeleteOutlined
            style={
              {
                fontSize: '18px',
                color: (record?.Status === 'completed' || record?.Status === 'waiting') ? '#ff7875' : 'red',
                paddingLeft: '15px',
                pointerEvents: (record?.Status === 'completed' || record?.Status === 'waiting') ? 'none' : 'auto',
              }
            }
            onClick={() => showDeleteConfirm(record.Id)}
          />
        </span>
      ),
    },
  ];
  const compounderColumns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Doctor',
      dataIndex: 'Doctor',
      key: 'Doctor',
    },
    {
      title: 'Medicine',
      dataIndex: 'Medicine',
      key: 'Medicine',
      align: 'center',
      width: 500,
      render: (text) => text.map((item) => <Tag color="blue">{item}</Tag>),
    },
    {
      title: 'Date',
      dataIndex: 'joinDate',
      key: 'JoinDate',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <Switch
            defaultChecked={record?.Status === 'completed'}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            disabled={record?.Status === 'completed'}
            loading={statusUpdate === UPDATING}
            onChange={(state) => onSwitchChange(state, record?.Id)}
          />
        </span>
      ),
    },
  ];

  function getRange(startDate, endDate) {
    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const ranges = [startDate];

    while (startDate < endDate) {
      startDate = moment(addDays(startDate, 1)).format('YYYY-MM-DD');
      ranges.push(startDate);
    }

    return ranges;
  }

  const handleExportByFilters = () => {
    let exportFilter = [];
    const ranges = getRange(datePicker[0], datePicker[1]);

    if (doctor !== '' && datePicker.length > 0) {
      // eslint-disable-next-line max-len
      exportFilter = data.filter((item) => item?.doctor === doctor && ranges.includes(item?.date));
    } else if (doctor !== '') {
      exportFilter = data.filter((pat) => pat?.doctor === doctor);
    } else if (datePicker.length > 0) {
      exportFilter = data.filter((pat) => ranges.includes(pat?.date));
    }

    if (exportFilter.length > 0) {
      exportFilter = exportFilter.map((item) => omit(item, ['Id', 'date', 'doctor']));
    }

    return exportFilter;
  };

  return (
    <>
      {
        typeOfId === USER_STATE.ADMIN_FULL && (
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => {
              setAll(true);
              setOpenModal(true);
            }}
          >
            Export To CSV
          </Button>
        )
      }
      <Modal
        getContainer={false}
        title="Export Data To Excel"
        visible={openModal}
        okText="Export"
        onCancel={() => setOpenModal(false)}
        maskClosable={false}
        closable
        afterClose={() => setAll(false)}
        footer={[
          <Button key="back" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" disabled={!data.length > 0}>
            <CSVLink
              asyncOnClick
              data={data.map((item) => omit(item, ['Id', 'date', 'doctor']))}
              separator=","
              target="_blank"
              className="btn btn-primary"
              filename="Patients-Record.csv"
              onClick={(event, done) => {
                message.success('The file is downloading');
                done();
              }}
            >
              Export All
            </CSVLink>
          </Button>,
          <Button
            key="filter"
            type="primary"
            disabled={!handleExportByFilters().length > 0}
          >
            <CSVLink
              asyncOnClick
              separator=","
              target="_blank"
              className="btn btn-primary"
              filename="Patients-Record.csv"
              data={handleExportByFilters()}
              onClick={(event, done) => {
                message.success('The file is downloading');
                done();
              }}
            >
              Export By Filters
            </CSVLink>
          </Button>,
        ]}
      >
        <Row>
          <Col>
            <Row>
              <Text style={{ marginBottom: 16 }}>Filter By Doctor:</Text>
            </Row>
            <Select
              allowClear
              style={{ width: 230 }}
              placeholder="Select a doctor"
              onChange={(value) => setDoctor(value)}
              disabled={isFetchingEmployees === FETCHING}
            >
              {
                employees?.employee?.filter((employee) => {
                  return employee?.designation === 'doctor';
                  // eslint-disable-next-line max-len
                }).map((item) => <Select.Option value={item.name} key={item.name}>{item.name}</Select.Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: 18 }}>
            <Row>
              <Text style={{ marginBottom: 16 }}>Filter By Date:</Text>
            </Row>
            <RangePicker
              onChange={(value, dateString) => setDatePicker(dateString)}
              format="YYYY-MM-DD"
            />
          </Col>
        </Row>
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          { datePicker.length > 0 && !handleExportByFilters().length > 0 && <Text type="danger">No Record Found</Text> }
        </div>
      </Modal>
      <List
        columns={
          // eslint-disable-next-line no-nested-ternary
          typeOfId === USER_STATE.ADMIN_PARTIAL
            ? doctorColumns
            : typeOfId === USER_STATE.COMPOUNDER
              ? compounderColumns
              : receptionistColumns
        }
        data={data}
        patientLength={patientLength}
        page={page}
        setPage={setPage}
        statusUpdate={statusUpdate}
      />
    </>
  );
};

TableHeader.defaultProps = {
  user: {},
};

TableHeader.propTypes = {
  patients: PropsTypes.any.isRequired,
  showDeleteConfirm: PropsTypes.func.isRequired,
  showModalForUpdate: PropsTypes.func.isRequired,
  setAll: PropsTypes.func.isRequired,
  setId: PropsTypes.func.isRequired,
  search: PropsTypes.object.isRequired,
  page: PropsTypes.object.isRequired,
  setPage: PropsTypes.func.isRequired,
  onSwitchChange: PropsTypes.func.isRequired,
  statusUpdate: PropsTypes.string.isRequired,
  radioButton: PropsTypes.string.isRequired,
  user: PropsTypes.any,
  all: PropsTypes.bool.isRequired,
  employees: PropsTypes.any.isRequired,
  isFetchingEmployees: PropsTypes.string.isRequired,
};

export default TableHeader;
