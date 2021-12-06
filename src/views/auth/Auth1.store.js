import { createSlice } from '@reduxjs/toolkit';

import { Map } from 'immutable';
import {
  INACTIVE,
  LOGGED_IN,
  REGISTERED,
  LOGGED_OUT,
  LOGGING_IN,
  REGISTERING,
  LOGIN_ERROR,
  LOGGING_OUT,
  LOGOUT_ERROR,
  REGISTER_ERROR,
  PASSWORD_UPDATED,
  UPDATING_PASSWORD,
  PASSWORD_UPDATE_ERROR,
} from '../../common/constants';

const initialState = Map({
  user: null,
  authStatus: INACTIVE,
  isAuthenticated: false,
});

const loginReducers = {
  requestUserLogin: (state) => state
    .set('user', null)
    .set('isAuthenticated', false)
    .set('authStatus', LOGGING_IN),
  userLoginSuccess: (state, action) => state
    .set('isAuthenticated', true)
    .set('user', action.payload)
    .set('authStatus', LOGGED_IN),
  userLoginFailure: (state) => state
    .set('user', null)
    .set('isAuthenticated', false)
    .set('authStatus', LOGIN_ERROR),
};

const logoutReducers = {
  requestUserLogout: (state) => state
    .set('authStatus', LOGGING_OUT),
  userLogoutSuccess: (state) => state
    .set('isAuthenticated', false)
    .set('authStatus', LOGGED_OUT),
  userLogoutFailure: (state) => state
    .set('authStatus', LOGOUT_ERROR),
};

const registerReducers = {
  requestUserRegister: (state) => state
    .set('authStatus', REGISTERING),
  userRegisterSuccess: (state) => state
    .set('authStatus', REGISTERED),
  userRegisterFailure: (state) => state
    .set('authStatus', REGISTER_ERROR),
};

const updatePasswordReducers = {
  requestUserPasswordUpdate: (state) => state
    .set('authStatus', UPDATING_PASSWORD),
  userPasswordUpdateSuccess: (state) => state
    .set('authStatus', PASSWORD_UPDATED),
  userPasswordUpdateFailure: (state) => state
    .set('authStatus', PASSWORD_UPDATE_ERROR),
};

const authsSlice = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    ...loginReducers,
    ...logoutReducers,
    ...registerReducers,
    ...updatePasswordReducers,
  },
});

export const {
  requestUserLogin,
  userLoginSuccess,
  userLoginFailure,
  requestUserLogout,
  userLogoutSuccess,
  userLogoutFailure,
  requestUserRegister,
  userRegisterSuccess,
  userRegisterFailure,
  requestUserPasswordUpdate,
  userPasswordUpdateSuccess,
  userPasswordUpdateFailure,
} = authsSlice.actions;

export default authsSlice.reducer;
