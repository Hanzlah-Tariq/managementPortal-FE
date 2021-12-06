import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import Content from './content/DashboardContent';
import TopBar from './layout/Topbar';
import Sidebar from './layout/Sidebar';
import { USER_STATE } from '../../common/constants';

const Dashboard = ({
  isAuthenticated, match, user, authStatus, location,
}) => {
  const [collapsed, toggleSideBar] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && user?.user && ['dashboard'].includes(location?.pathname.split('/')[1])) {
      // eslint-disable-next-line max-len
      if ([USER_STATE.EMPLOYEE, USER_STATE.ADMIN_PARTIAL, USER_STATE.COMPOUNDER].includes(user.user.typeOfId)) {
        history.push('/dashboard/user/patients');
      } else if (user.user.typeOfId === USER_STATE.ADMIN_FULL) {
        if (location?.pathname === '/dashboard') {
          history.push('/dashboard/admin/employees');
        } else if
        (location?.pathname === '/dashboard/admin/employees'
          || location?.pathname === '/dashboard/admin/fee'
          || location?.pathname === '/dashboard/user/patients'
          || location?.pathname === '/dashboard/admin/medicines') {
          history.push(location.pathname);
        } else {
          history.push('/dashboard/admin/employees');
        }
      }
    }
  }, [authStatus, isAuthenticated]);

  return (
    <div id="dashboard">
      <TopBar user={user} />
      <Layout className="layout">
        {
          user?.user?.typeOfId === USER_STATE.ADMIN_FULL && (
            <Sidebar
              user={user}
              match={match}
              location={location}
              collapsed={collapsed}
              toggleSideBar={() => toggleSideBar(!collapsed)}
            />
          )
          }
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            user={user}
            match={match}
            location={location}
            isAuthenticated={isAuthenticated}
          />
        </Layout>
      </Layout>
    </div>
  );
};

Dashboard.defaultProps = {
  user: {},
};

Dashboard.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authStatus: PropTypes.string.isRequired,
};

Dashboard.defaultProps = {};

export default Dashboard;
