import React, { useEffect } from 'react';
import PropsTypes from 'prop-types';

import { Link, useParams } from 'react-router-dom';

import {
  Col, Row, Layout, Typography, Button, Spin, Tag,
} from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const Patients = ({ statusUpdate, patient, fetchPatient }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchPatient(id);
  }, []);

  return (
    <>
      <div>
        <Link to="/dashboard/user/patients">
          <Button type="primary">
            Back
          </Button>
        </Link>
      </div>
      <div style={{ background: '#FAFAFA', minHeight: 280 }}>
        {statusUpdate === 'FETCHED' ? (
          <Content>
            <Row style={{ marginLeft: '195px', marginTop: '25px', padding: '40px' }}>
              <Col span={4} style={{ marginLeft: '50px' }}>
                <Text strong> JoinDate: </Text>
                <br />
                <Text strong> Name: </Text>
                <br />
                <Text strong> Age: </Text>
                <br />
                <Text strong> Gender: </Text>
                <br />
                <Text strong> Disease: </Text>
                <br />
                <Text strong> Medicine: </Text>
              </Col>
              <Col span={12}>
                <Text>
                  {patient
                  && patient.patient
                  && patient.patient.joinDate.split('T')[0]}
                </Text>
                <br />
                <Text>
                  {patient
                && patient.patient
                && patient.patient.name}
                </Text>
                <br />
                <Text>
                  {patient
                && patient.patient
                && patient.patient.age}
                </Text>
                <br />
                <Text>
                  {patient
                && patient.patient
                && patient.patient.gender}
                </Text>
                <br />
                <Text>
                  {patient
                  && patient.patient
                  // eslint-disable-next-line no-mixed-operators
                  && patient.patient.disease || '-'}
                </Text>
                <br />
                <Text>
                  {patient
                  && patient.patient
                  // eslint-disable-next-line no-mixed-operators
                  && patient.patient.medicine.map((item) => <Tag color="blue">{item}</Tag>) || '-'}
                </Text>
              </Col>
            </Row>
          </Content>
        ) : <Spin size="large" tip="loading..." style={{ marginTop: '100px', marginLeft: '500px' }} /> }
      </div>
    </>
  );
};

Patients.defaultProps = {
  patient: null,
};

Patients.propTypes = {
  statusUpdate: PropsTypes.string.isRequired,
  patient: PropsTypes.object,
  fetchPatient: PropsTypes.func.isRequired,
};

export default Patients;
