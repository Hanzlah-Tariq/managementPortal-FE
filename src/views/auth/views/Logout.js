/* eslint-disable */ 
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import storage from '../../../common/storage';

const LogOut = ({ logOutUser, isLoggingOut, isLoggedOut }) => {
  useEffect(() => {
    if (storage.get('user')) {
      logOutUser();
    }
  }, []);

  return (
    <>
      {isLoggingOut && <Spin tip="Logging Out..." style={{ marginTop: '50px' }} />}
      {isLoggedOut && <Redirect to="/user/login" />}
    </>
  );
};

LogOut.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
};
export default LogOut;
