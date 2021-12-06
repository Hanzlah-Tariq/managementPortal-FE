import React from 'react';
import { Layout } from 'antd';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import MedicineView from './view/Medicine.container';

const { Content } = Layout;

const Medicines = () => {
  return (
    <Content id="patient" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/admin/medicines"
        Component={MedicineView}
      />
    </Content>
  );
};

export default Medicines;
