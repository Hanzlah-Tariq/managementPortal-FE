import React from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { get } from 'lodash';
import { Avatar } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

import { USER_STATE } from '../../../../../../common/constants';
import storage from '../../../../../../common/storage';
import List from '../Employees.List.view';

const TableHeader = ({
  employees,
  showDeleteConfirm,
  showModalForUpdate,
  setId,
  search,
  page,
  statusUpdate,
  radioButton,
  setPage,
}) => {
  let data = employees && employees.employee
    ? employees.employee.map((row, index) => ({
      Name: row.name.charAt(0).toUpperCase() + row.name.slice(1),
      Gender: row.gender.charAt(0).toUpperCase() + row.gender.slice(1),
      Photo: row.photo,
      Designation: row.designation,
      // eslint-disable-next-line prefer-template
      joinDate: row.joinDate + ' ' + row.time,
      Sr: index + 1,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
    }))
    : [];

  data = data.filter((item) => (radioButton
    ? item.Designation.includes(radioButton)
    : item.Name.toLowerCase().includes(search.subString.toLowerCase())));

  const empLength = employees ? employees.length : 0;
  const typeOfId = get(storage.get('user'), 'user.typeOfId');

  const columns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      dataIndex: 'Photo',
      key: 'img',
      width: '50px',
      render: (record) => (
        <Avatar size="large" src={`http://192.168.18.133:8000/${record}`} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <Link to={`/dashboard/admin/employee/${record.Id}`}>{text}</Link>
      ),
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'Designation',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'JoinDate',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <FormOutlined
            style={{ color: 'green', fontSize: '18px' }}
            onClick={() => {
              showModalForUpdate();
              setId(record.Id);
            }}
          />
          {typeOfId === USER_STATE.ADMIN_FULL ? (
            <DeleteOutlined
              style={{ color: 'red', paddingLeft: '15px', fontSize: '18px' }}
              onClick={() => showDeleteConfirm(record.Id)}
            />
          ) : null}
        </span>
      ),
    },
  ];
  return (
    <List
      columns={columns}
      data={data}
      empLength={empLength}
      page={page}
      setPage={setPage}
      statusUpdate={statusUpdate}
    />
  );
};

TableHeader.propTypes = {
  employees: PropsTypes.any.isRequired,
  showDeleteConfirm: PropsTypes.func.isRequired,
  showModalForUpdate: PropsTypes.func.isRequired,
  setId: PropsTypes.func.isRequired,
  search: PropsTypes.object.isRequired,
  page: PropsTypes.object.isRequired,
  setPage: PropsTypes.func.isRequired,
  radioButton: PropsTypes.string.isRequired,
  statusUpdate: PropsTypes.string.isRequired,
};

export default TableHeader;
