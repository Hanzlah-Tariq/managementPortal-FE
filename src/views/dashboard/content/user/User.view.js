import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Spin,
} from 'antd';

import TopBar from '../../layout/Topbar';

const { Text } = Typography;

const Employee = ({
  getEmployeeRecord,
  isAuthenticated,
  isFetched,
  record,
}) => {
  useEffect(() => {
    getEmployeeRecord();
  }, [getEmployeeRecord]);

  const date = new Date();
  const time = date.getHours();
  let greeting;
  if (time < 12) {
    greeting = 'Good morning!';
  } else if (time > 12) {
    greeting = 'Good afternoon!';
  } else if (time === 13) {
    greeting = 'Go eat lunch!';
  } else if (time === 18) {
    greeting = 'Good evening!';
  } else {
    greeting = 'Good night!';
  }

  return (
    <div>
      {isAuthenticated && isFetched ? (
        <div>
          <TopBar />
          <Text strong style={{ paddingTop: '50px', marginLeft: '100px' }}>
            {greeting}
          </Text>
          <Row>
            <Col style={{ paddingLeft: '50px' }}>
              <img
                src={`http://localhost:8000/${
                  record && record.record && record.record.photo
                }`}
                alt="avatar"
                height={80}
                width={80}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '15px', marginLeft: '50px' }}>
            <Col span={2}>
              <Text strong> Name: </Text>
              <br />
              <Text strong> Age: </Text>
              <br />
              <Text strong> Gender: </Text>
              <br />
              <Text strong> Designation: </Text>
              <br />
              <Text strong> Email: </Text>
              <br />
              <Text strong> JoinDate: </Text>
              <br />
              <Text strong> Address: </Text>
            </Col>
            <Col span={4}>
              <Text>{record && record.record && record.record.name}</Text>
              <br />
              <Text>{record && record.record && record.record.age}</Text>
              <br />
              <Text>{record && record.record && record.record.gender}</Text>
              <br />
              <Text>
                {record && record.record && record.record.designation}
              </Text>
              <br />
              <Text>{record && record.record && record.record.email}</Text>
              <br />
              <Text>
                {record
                  && record.record
                  && record.record.joinDate.split('T')[0]}
              </Text>
              <br />
              <Text>{record && record.record && record.record.address}</Text>
            </Col>
          </Row>
        </div>
      ) : (
        <Spin
          size="large"
          tip="loading..."
          style={{ marginTop: '100px', marginLeft: '100px' }}
        />
      )}
    </div>
  );
};

Employee.defaultProps = {
  isAuthenticated: false,
};

Employee.propTypes = {
  isAuthenticated: PropTypes.bool,
  isFetched: PropTypes.bool.isRequired,
  record: PropTypes.object.isRequired,
  getEmployeeRecord: PropTypes.func.isRequired,
};

Employee.styles = {};

export default Employee;
