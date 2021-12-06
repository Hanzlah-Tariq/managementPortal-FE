import React from 'react';
import split from 'lodash/split';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { getSideBarRoutes } from '../dashboard.routes';

const { Sider } = Layout;

const Sidebar = ({
  user, match, location, collapsed, toggleSideBar,
}) => {
  const selectedItem = location && location.pathname && split(location.pathname, '/')[1];
  const routes = user && user.user && getSideBarRoutes(user.user.typeOfId);

  return (
    <Sider
      collapsible
      width={225}
      collapsed={collapsed}
      onCollapse={toggleSideBar}
      style={Sidebar.styles.sideBarLayout}
    >
      <div style={{ paddingTop: 42 }} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedItem]}>
        {routes
          && routes.map((route) => {
            return (
              <Menu.Item key={route.item}>
                <Link to={`${match.url}${route.url}`} href={route.title}>
                  {route.icon}
                  <span style={{ paddingLeft: 12 }}>{route.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
      </Menu>
    </Sider>
  );
};

Sidebar.defaultProps = {
  user: {},
};

Sidebar.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
};

Sidebar.styles = {
  sideBarLayout: {
    left: 0,
    zIndex: 10,
    overflow: 'auto',
    position: 'relative',
    borderRight: 'thin solid #181818',
    boxShadow: 'rgba(0, 21, 41, 0.35) 2px 0px 6px',
  },
};

export default Sidebar;
