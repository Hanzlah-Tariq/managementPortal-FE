import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import PropTypes from 'prop-types';

import Admins from './admin/Admins.container';
import Patients from './user/Patients.container';
import ProtectedComponent from '../../../components/ProtectedComponent';
import Poll from './poll/Poll.container';
import Medicines from './medicine/Medicine.view';
import Fee from './fee/Fee.view';

const { Content } = Layout;

const date = new Date();

const DashboardContent = ({
  match, location, isAuthenticated,
}) => {
  const title = location.pathname.split('/')[3];
  const handleTitle = title?.charAt(0)?.toUpperCase() + title?.slice(1);

  return [
    <div
      key="bread-crumb"
      style={{
        background: 'white',
        padding: '0 24px',
        margin: '0 -24px',
      }}
    >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>{handleTitle}</Breadcrumb.Item>
      </Breadcrumb>
      <h1 style={{ fontSize: '1.3rem' }}>{handleTitle}</h1>
    </div>,
    <Content id="dashboard-content" key="dashboard-content">
      <ProtectedComponent
        path={`${match.url}/admin`}
        Component={Admins}
        match={match}
        location={location}
      />
      <ProtectedComponent
        path={`${match.url}/user`}
        Component={Patients}
        match={match}
        location={location}
      />
      <ProtectedComponent
        path={`${match.url}/admin`}
        Component={Medicines}
        match={match}
        location={location}
      />
      <ProtectedComponent
        path={`${match.url}/admin`}
        Component={Fee}
        match={match}
        location={location}
      />
    </Content>,
    isAuthenticated && <Poll />,
    <footer
      style={{ textAlign: 'center', padding: '10px' }}
      key="dashboard-footer"
    >
      {`MAB Homeopathic Trust Hospital ${date.getFullYear()}.`}
    </footer>,
  ];
};

DashboardContent.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

DashboardContent.defaultProps = {
  user: null,
};

export default DashboardContent;
