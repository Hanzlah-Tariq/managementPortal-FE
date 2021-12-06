import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExclamationCircleOutlined, FilterOutlined, FormOutlined, DeleteOutlined,
} from '@ant-design/icons';
import {
  Col,
  Row,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Layout,
  Tooltip,
} from 'antd';
import { FETCHING, PENDING, UPDATING } from '../../../../../common/constants';

const { Content } = Layout;
const { confirm } = Modal;

const MedicineView = ({
  medicines,
  addMedicine,
  statusUpdate,
  deleteMedicine,
  updateMedicine,
  fetchAllMedicines,
}) => {
  const [form] = Form.useForm();
  const [page, setPage] = useState({ current: 1 });
  const [medicineRecord, setMedicineRecord] = useState({});
  const [search, setSearch] = useState({ subString: '' });

  const status = {
    CREATED: 'CREATED',
    DELETED: 'DELETED',
    UPDATED: 'UPDATED',
  };

  useEffect(() => {
    fetchAllMedicines();
  }, [status[statusUpdate]]);

  useEffect(() => {
    form.setFieldsValue({ medicine: medicineRecord.Name });
  }, [medicineRecord?.Id]);

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this medicine?',
      icon: <ExclamationCircleOutlined />,
      content:
        'After this operation medicine will permanently deleted from database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteMedicine(itemId);
      },
    });
  };

  const handleSearch = (e) => {
    setSearch({ subString: e.target.value });
    setPage({ current: 1 });
  };

  const medicineColumns = [
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
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <>
            <FormOutlined
              style={{ fontSize: '18px', color: 'green' }}
              onClick={() => setMedicineRecord(record)}
            />
            <DeleteOutlined
              style={{ color: 'red', paddingLeft: '15px', fontSize: '18px' }}
              onClick={() => showDeleteConfirm(record.Id)}
            />
          </>
        </span>
      ),
    },
  ];
  const showTotal = (total) => `Total ${total} patients`;
  const onChange = (currentPage) => setPage({ current: currentPage });

  let data = medicines?.length > 0
    ? medicines.map((row, index) => ({
      Sr: index + 1,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
      Name: row.medicine.charAt(0).toUpperCase() + row.medicine.slice(1),
    }))
    : [];

  data = data.filter((item) => item.Name.toLowerCase().includes(search.subString.toLowerCase()));

  const onFinish = (values) => {
    if (medicineRecord.Id) {
      updateMedicine(medicineRecord.Id, values);
    } else {
      addMedicine(values);
    }
    setMedicineRecord({});
    form.resetFields();
  };

  return (
    <Content>
      <Row>
        <Col span={10}>
          <Form
            form={form}
            layout="inline"
            name="medicine"
            onFinish={onFinish}
          >
            <Form.Item
              colon={false}
              name="medicine"
            >
              <Input placeholder="Please Input Medicine" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={statusUpdate === PENDING || statusUpdate === UPDATING}
                  disabled={!form.getFieldValue('medicine')}
                >
                  { medicineRecord?.Id ? 'Update Medicine' : 'Add Medicine' }
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
        <Col span={2} />
        <Col span={8} style={{ paddingLeft: '150px' }} />
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
        columns={medicineColumns}
        loading={statusUpdate === FETCHING}
        pagination={{
          defaultPageSize: 10,
          current: page.current,
          onChange,
          total: { medicines: medicines.length },
          showTotal,
        }}
      />
    </Content>
  );
};

MedicineView.defaultProps = {
  medicines: [],
};

MedicineView.propTypes = {
  medicines: PropTypes.any,
  addMedicine: PropTypes.func.isRequired,
  deleteMedicine: PropTypes.func.isRequired,
  statusUpdate: PropTypes.string.isRequired,
  updateMedicine: PropTypes.func.isRequired,
  fetchAllMedicines: PropTypes.func.isRequired,
};

export default MedicineView;
