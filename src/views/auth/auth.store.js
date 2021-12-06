import { createSlice } from '@reduxjs/toolkit';

import { Map } from 'immutable';
import {
  INACTIVE,
  SUCCESS,
  FAILURE,
  EMAIL_VERIFYING,
  EMAIL_VERIFIED,
  EMAIL_VERIFICATION_CONFLICT,
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_ERROR,
  LOGGING_OUT,
  LOGGED_OUT,
  LOGOUT_ERROR,
  REGISTERED,
  REGISTERING,
  REGISTER_ERROR,
  UPDATING_PASSWORD,
  PASSWORD_UPDATED,
  PASSWORD_UPDATE_ERROR,
} from '../../common/constants';

const initialState = Map({
  user: null,
  authStatus: INACTIVE,
  isLocalUserFetched: false,
  authError: null,
  isAuthenticated: false,
  isEmailVerified: '',
  resetMsg: '',
  isUpdatingAccount: false,
});

const loginReducers = {
  requestUserLogin: (state) => state
    // .set('user', null)
    // .set('isLocalUserFetched', false)
    // .set('isAuthenticated', false)
    .set('authStatus', LOGGING_IN),
  userLoginSuccess: (state, action) => state
    .set('user', action.payload)
    .set('isAuthenticated', true)
    .set('isLocalUserFetched', true)
    .set('authStatus', LOGGED_IN),
  userLoginFailure: (state, action) => state
    // .set('user', null)
    .set('isAuthenticated', false)
    .set('isLocalUserFetched', false)
    .set('authError', action.payload)
    .set('authStatus', LOGIN_ERROR),
};

const logoutReducers = {
  requestUserLogout: (state) => state
    .set('authError', null)
    .set('authStatus', LOGGING_OUT),
  userLogoutSuccess: (state) => state
    .set('isAuthenticated', false)
    .set('authStatus', LOGGED_OUT)
    .set('isAuthenticated', false),
  userLogoutFailure: (state, action) => state
    .set('authError', action.payload)
    .set('authStatus', LOGOUT_ERROR),
};

const registerReducers = {
  requestUserRegister: (state) => state
    .set('authError', null)
    .set('authStatus', REGISTERING),
  userRegisterSuccess: (state) => state
    .set('authStatus', REGISTERED),
  userRegisterFailure: (state, action) => state
    .set('authError', action.payload)
    .set('authStatus', REGISTER_ERROR),
};

const emailVerficationReducers = {
  requestVerifyUserEmail: (state) => state
    .set('isEmailVerified', EMAIL_VERIFYING),
  verifyUserEmailSuccess: (state) => state
    .set('isEmailVerified', EMAIL_VERIFIED),
  verifyUserEmailFailure: (state) => state
    .set('isEmailVerified', EMAIL_VERIFICATION_CONFLICT),
};

const passwordResetReducers = {
  requestUserPasswordReset: (state) => state
    .set('resetMsg', ''),
  userPasswordResetSuccess: (state) => state
    .set('resetMsg', SUCCESS),
  userPasswordResetFailure: (state) => state
    .set('resetMsg', FAILURE),
};

const userVerificationReducers = {
  requestResendUserVerification: (state) => state
    .set('isUpdatingAccount', true),
  resendUserVerificationSuccess: (state) => state
    .set('isUpdatingAccount', false),
  resendUserVerificationFailure: (state) => state
    .set('isUpdatingAccount', false),
};

const updatePasswordReducers = {
  requestUserPasswordUpdate: (state) => state
    .set('authStatus', UPDATING_PASSWORD),
  userPasswordUpdateSuccess: (state) => state
    .set('authStatus', PASSWORD_UPDATED),
  userPasswordUpdateFailure: (state) => state
    .set('authStatus', PASSWORD_UPDATE_ERROR),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    ...loginReducers,
    ...logoutReducers,
    ...registerReducers,
    ...emailVerficationReducers,
    ...passwordResetReducers,
    ...userVerificationReducers,
    ...updatePasswordReducers,
  },
});

export const {
  requestUserLogin,
  requestUserLogout,
  userLoginFailure,
  userLoginSuccess,
  userLogoutFailure,
  userLogoutSuccess,
  requestUserRegister,
  userRegisterFailure,
  userRegisterSuccess,
  requestResendUserVerification,
  requestUserPasswordReset,
  requestVerifyUserEmail,
  resendUserVerificationFailure,
  resendUserVerificationSuccess,
  userPasswordResetFailure,
  userPasswordResetSuccess,
  verifyUserEmailFailure,
  verifyUserEmailSuccess,
  requestUserPasswordUpdate,
  userPasswordUpdateFailure,
  userPasswordUpdateSuccess,
} = authSlice.actions;

export default authSlice.reducer;
