import React from 'react';
import PropsTypes from 'prop-types';
import { message } from 'antd';
import { CSVDownload } from 'react-csv';

const Csv = ({ record }) => {
  console.log('record ==>', record);

  return (
    <>
      <CSVDownload
        data={record}
        separator=","
        target="_blank"
        className="btn btn-primary"
        filename="Patients_Record.csv"
      />
      { message.success('The file is downloading') }
    </>
  );
};

Csv.defaultProps = {
  record: [],
};

Csv.propTypes = {
  record: PropsTypes.array,
};

export default Csv;
