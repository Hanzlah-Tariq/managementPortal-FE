import React from 'react';
import PropsTypes from 'prop-types';

import { Table } from 'antd';


const List = ({
  columns, patientLength, data, page, setPage, statusUpdate,
}) => {
  const showTotal = (total) => {
    return `Total ${total} patients`;
  };

  const onChange = (currentPage) => {
    setPage({
      current: currentPage,
    });
  };

  return (
    <Table
      loading={statusUpdate === 'FETCHING'}
      rowKey={(obj) => obj.Id}
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
        current: page.current,
        onChange,
        total: { patientLength },
        showTotal,
      }}
    />
  );
};

List.propTypes = {
  columns: PropsTypes.array.isRequired,
  data: PropsTypes.array.isRequired,
  patientLength: PropsTypes.number.isRequired,
  page: PropsTypes.object.isRequired,
  setPage: PropsTypes.func.isRequired,
  statusUpdate: PropsTypes.string.isRequired,

};

export default List;
