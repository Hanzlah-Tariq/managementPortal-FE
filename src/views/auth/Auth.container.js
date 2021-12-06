import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Authentication from './Auth.view';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUserEmail,
  userPasswordReset,
  resendEmailVerification,
  userPasswordUpdate,
} from './auth.api';

const AuthContainer = () => {
  const dispatch = useDispatch();

  const props = {
    authStatus: useSelector((state) => state.getIn(['dashboard', 'auths', 'authStatus'])),
    isEmailVerified: useSelector((state) => state.getIn(['auth', 'isEmailVerified'])),
    logoutUser: () => dispatch(logoutUser()),
    loginUser: (payload) => dispatch(loginUser(payload)),
    registerUser: (payload) => dispatch(registerUser(payload)),
    verifyUserEmail: (token) => dispatch(verifyUserEmail(token)),
    userPasswordReset: (token) => dispatch(userPasswordReset(token)),
    resendEmailVerification: (token) => dispatch(resendEmailVerification(token)),
    userPasswordUpdate: (payload) => dispatch(userPasswordUpdate(payload)),
  };

  return (
    <Authentication
      {...props}
    />
  );
};

export default AuthContainer;
