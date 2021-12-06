import { omit, get } from 'lodash';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import {
  FilterOutlined,
} from '@ant-design/icons';
import {
  Col,
  Row,
  Form,
  Input,
  Table,
  Layout,
  Tooltip, Button, Modal, message, Typography, DatePicker, Radio, InputNumber,
} from 'antd';
import { CSVLink } from 'react-csv';
import { FETCHING, UPDATING, USER_STATE } from '../../../../../common/constants';
import storage from '../../../../../common/storage';

const moment = extendMoment(Moment);
const { Content } = Layout;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const FeeView = ({
  doc,
  fee,
  // eslint-disable-next-line no-unused-vars
  addFee,
  updateFee,
  statusUpdate,
  fetchCurrentFee,
  fetchDoctorsAssociatedPatientsRecord,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [form] = Form.useForm();
  const [all, setAll] = useState(false);
  const [page, setPage] = useState({ current: 1 });
  const [openModal, setOpenModal] = useState(false);
  const [datePicker, setDatePicker] = useState([]);
  const typeOfId = get(storage.get('user'), 'user.typeOfId');
  const [search, setSearch] = useState({ subString: '' });
  const [formatData, setFormatData] = useState('today');

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    all ? setFormatData('all') : setFormatData('today');
  }, [all]);

  const status = {
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
  };

  useEffect(() => {
    fetchCurrentFee();
    fetchDoctorsAssociatedPatientsRecord();
  }, [status[statusUpdate]]);

  useEffect(() => {
    if (datePicker.includes('')) {
      setDatePicker([]);
    }
  }, [datePicker]);

  const recordColumns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      title: 'Doctor',
      dataIndex: 'Doctor',
      key: 'Doctor',
    },
    {
      title: 'Total Patients',
      dataIndex: 'Patients',
      key: 'Patients',
    },
    {
      title: 'Current Fee',
      dataIndex: 'CurrentFee',
      key: 'CurrentFee',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Total Rupees',
      dataIndex: 'Fee',
      key: 'Fee',
    },
  ];
  const showTotal = (total) => `Total ${total} doctors`;
  const onChange = (currentPage) => setPage({ current: currentPage });

  const handleSearch = (e) => {
    setSearch({ subString: e.target.value });
    setPage({ current: 1 });
  };

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  const filterByDate = all
    ? typeOfId === USER_STATE.ADMIN_FULL && doc
    : doc.filter((patient) => {
      return patient?.joinDate === today;
    });

  let data = filterByDate?.length > 0
    ? filterByDate.map((row, index) => ({
      Sr: index + 1,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
      Doctor: row.name.charAt(0).toUpperCase() + row.name.slice(1),
      Patients: row.totalPatients,
      Fee: `${row.totalPatients * fee}/- Rs`,
      Date: row.joinDate,
      CurrentFee: fee,
    }))
    : [];

  data = data.filter((item) => item.Doctor.toLowerCase().includes(search.subString.toLowerCase()));

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

    if (datePicker.length > 0) {
      const ranges = getRange(datePicker[0], datePicker[1]);
      exportFilter = data.filter((pat) => ranges?.includes(pat?.Date));
    }

    if (exportFilter.length > 0) {
      exportFilter = exportFilter.map((item) => omit(item, ['Id']));
    }

    return exportFilter;
  };

  const onRadioTodayChange = (e) => (e.target.value === 'today' ? setAll(false) : setAll(true));

  const onFinish = (values) => {
    updateFee(values);
    form.resetFields();
  };

  const feeRegex = new RegExp('^[0-9]{0,9}$');

  return (
    <Content>
      <Row>
        <Col span={7}>
          <Form
            form={form}
            layout="inline"
            name="fee"
            onFinish={onFinish}
          >
            <Form.Item
              colon={false}
              name="fee"
              rules={[
                {
                  pattern: feeRegex,
                  message: 'Fee should contain only numbers and less then 9 digits',
                },
              ]}
            >
              <InputNumber placeholder="fee" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={statusUpdate === UPDATING}
                  disabled={!form.getFieldValue('fee')}
                >
                  Update Fee
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
        <Col span={5}>
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
                  data={data?.map((item) => omit(item, ['Id']))}
                  separator=","
                  target="_blank"
                  className="btn btn-primary"
                  filename="Fee-Record.csv"
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
                disabled={!datePicker.length > 0 || !handleExportByFilters().length > 0}
              >
                <CSVLink
                  asyncOnClick
                  separator=","
                  target="_blank"
                  className="btn btn-primary"
                  filename="Fee-Record.csv"
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
        </Col>
        <Col span={8} style={{ paddingLeft: '150px' }}>
          {
            typeOfId === USER_STATE.ADMIN_FULL && (
              <Radio.Group onChange={onRadioTodayChange} defaultValue="today" value={formatData}>
                <Radio.Button value="today">Today</Radio.Button>
                <Radio.Button value="all">All</Radio.Button>
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
            />
          </Form.Item>
        </Col>
      </Row>
      <Table
        dataSource={data}
        rowKey={(obj) => obj.Id}
        columns={recordColumns}
        loading={statusUpdate === FETCHING}
        pagination={{
          defaultPageSize: 10,
          current: page.current,
          onChange,
          total: { medicines: doc.length },
          showTotal,
        }}
      />
    </Content>
  );
};

FeeView.defaultProps = {
  fee: '',
  doc: [],
};

FeeView.propTypes = {
  fee: PropTypes.any,
  doc: PropTypes.any,
  addFee: PropTypes.func.isRequired,
  updateFee: PropTypes.string.isRequired,
  statusUpdate: PropTypes.string.isRequired,
  fetchCurrentFee: PropTypes.func.isRequired,
  fetchDoctorsAssociatedPatientsRecord: PropTypes.func.isRequired,
};

export default FeeView;
