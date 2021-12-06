import React from 'react';
import { Layout } from 'antd';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import PatientsView from './patients/Patients.container';
import patientDetails from './patients/patientDetails/PatientDetails.container';

const { Content } = Layout;

const Patients = () => {
  return (
    <Content id="patient" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/user/patients"
        Component={PatientsView}
      />
      <ProtectedComponent
        path="/dashboard/user/patient/:id"
        Component={patientDetails}
      />
    </Content>
  );
};

export default Patients;
