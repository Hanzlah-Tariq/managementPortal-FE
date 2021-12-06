import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './views/Login';
import LogOut from './views/Logout';
import Register from './views/Register';
import ResendEmail from './views/ResendEmail';
import ForgotPassword from './views/ForgotPassword';
import EmailVerification from './views/EmailVerification';
import UpdatePassword from './views/UpdatePassword';
import {
  EMAIL_VERIFIED,
  LOGGING_IN,
  REGISTERING,
  REGISTERED,
  LOGGING_OUT,
  LOGGED_OUT,
  PASSWORD_UPDATED,
} from '../../common/constants';

const AuthRoutes = ({
  loginUser,
  logoutUser,
  registerUser,
  verifyUserEmail,
  userPasswordReset,
  resendEmailVerification,
  userPasswordUpdate,
  authStatus,
  isEmailVerified,
}) => {
  return ([
    <Route
      key="login"
      exact
      path={['/', '/user', '/user/login']}
      render={() => {
        return (
          <Login
            handleSubmit={loginUser}
            isLoggingIn={authStatus === LOGGING_IN}
          />
        );
      }}
    />,
    <Route
      key="register"
      exact
      path="/user/register"
      render={() => {
        return (
          <Register
            handleSubmit={registerUser}
            isRegistering={authStatus === REGISTERING}
            isRegisterSuccess={authStatus === REGISTERED}
          />
        );
      }}
    />,
    <Route
      key="logout"
      exact
      path="/user/logout"
      render={() => {
        return (
          <LogOut
            logOutUser={logoutUser}
            isLoggingOut={authStatus === LOGGING_OUT}
            isLoggedOut={authStatus === LOGGED_OUT}
          />
        );
      }}
    />,
    <Route
      key="emailVerification"
      exact
      path="/user/verify/:token"
      render={() => {
        return (
          <EmailVerification
            verifyUserEmail={verifyUserEmail}
            isEmailVerified={isEmailVerified === EMAIL_VERIFIED}
          />
        );
      }}
    />,
    <Route
      key="forgotPassword"
      exact
      path="/user/forgot-password"
      render={() => {
        return (
          <ForgotPassword
            isLoggingIn={authStatus === LOGGING_IN}
            handleSubmit={userPasswordReset}
          />
        );
      }}
    />,
    <Route
      key="resendEmail"
      exact
      path="/user/resend-email"
      render={() => {
        return (
          <ResendEmail
            handleSubmit={resendEmailVerification}
            isLoggingIn={authStatus === LOGGING_IN}
          />
        );
      }}
    />,
    <Route
      key="UpdatePassword"
      exact
      path="/user/update-password"
      render={() => {
        return (
          <UpdatePassword
            handleSubmit={userPasswordUpdate}
            isUpdatedPassword={authStatus === PASSWORD_UPDATED}
          />
        );
      }}
    />,
  ]);
};

AuthRoutes.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  userPasswordReset: PropTypes.func.isRequired,
  userPasswordUpdate: PropTypes.func.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  isEmailVerified: PropTypes.string.isRequired,
};

export default AuthRoutes;
