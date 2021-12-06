import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import AppRoutes from './app.routes';
import storage from './common/storage';
import { AUTH_ROUTES, LOGGING_IN } from './common/constants';
import AppLoad from './components/appLoad/AppLoad';
import { userLoginSuccess } from './views/auth/Auth1.store';

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.getIn(['dashboard', 'auths', 'isAuthenticated']));
  const authStatus = useSelector((state) => state.getIn(['dashboard', 'auths', 'authStatus']));


  useEffect(() => {
    if (isAuthenticated && AUTH_ROUTES.includes(location.pathname)) {
      history.push('/dashboard');
    } else if (!isAuthenticated && get(storage.get('user'), 'token')) {
      dispatch(userLoginSuccess((storage.get('user') || null)));
    }
  }, [isAuthenticated]);

  return [
    <div key="app" id="app-wrapper">
      {authStatus === LOGGING_IN ? <AppLoad /> : <AppRoutes isAuthenticated={isAuthenticated} />}
    </div>,
  ];
};

Root.defaultProps = {
  isAuthenticated: false,
};

export default Root;
