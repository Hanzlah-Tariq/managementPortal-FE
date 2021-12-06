import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AUTH_ROUTES } from './common/constants';
import Authentication from './views/auth/Auth.container';
import Dashboard from './views/dashboard/Dashboard.container';
import ProtectedComponent from './components/ProtectedComponent';
import Error401 from './components/errors/401';
import Error404 from './components/errors/404';
import Error500 from './components/errors/500';

// eslint-disable-next-line react/prop-types
const AppRoutes = ({ isAuthenticated }) => (
  <Switch>
    <ProtectedComponent
      key="dashboard"
      path="/dashboard"
      Component={Dashboard}
      isAuthenticated={isAuthenticated}
    />
    <Route
      exact
      path={AUTH_ROUTES}
      key="authentication"
      component={Authentication}
    />
    <Route
      exact
      key="unauthorized"
      path="/unauthorized"
      component={Error401}
    />
    <Route
      exact
      key="internal-server-error"
      path="/internal-server-error"
      component={Error500}
    />
    <Route
      key="not-found"
      component={Error404}
    />
  </Switch>
);

export default AppRoutes;
