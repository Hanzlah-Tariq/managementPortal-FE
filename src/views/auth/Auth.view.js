import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import AuthRoutes from './auth.routes';

const date = new Date();

const Authentication = (props) => {
  return (
    <div key="auth-view" id="auth">
      <div className="auth-wrapper">
        <section className="auth-content">

          <div className="auth-logo">
            <img src="/test1.jpg" alt="trust" height={200} />
          </div>

          <div className="auth-component">
            <Card>
              <AuthRoutes
                {...props}
              />
            </Card>
          </div>

        </section>
        <footer className="auth-footer">
          {`MAB Homeopathic Trust Hospital ${date.getFullYear()}.`}
        </footer>
      </div>
    </div>
  );
};

Authentication.defaultProps = {};

Authentication.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  verifyUserEmail: PropTypes.func.isRequired,
  userPasswordReset: PropTypes.func.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
  userPasswordUpdate: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  isEmailVerified: PropTypes.string.isRequired,
};

Authentication.styles = {
  layout: {},
};

export default Authentication;
