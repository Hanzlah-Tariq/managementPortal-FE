import React from 'react';
import { Layout } from 'antd';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import FeeView from './view/Fee.container';

const { Content } = Layout;

const Fee = () => {
  return (
    <Content id="patient" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/admin/fee"
        Component={FeeView}
      />
    </Content>
  );
};

export default Fee;
