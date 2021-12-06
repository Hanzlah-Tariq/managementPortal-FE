import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import {
  PENDING,
  CREATED,
  FAILURE,
  FETCHING,
  FETCHED,
  DELETED,
  DELETING,
  UPDATING,
  UPDATED,
  INACTIVE,
} from '../../../../../common/constants';

const initialState = Map({
  statusUpdate: INACTIVE,
  employees: [],
  employee: null,
  employeeError: null,
});

const createEmployeeReducer = {
  requestEmployeeCreation: (state) => state.set('statusUpdate', PENDING),
  employeeCreationSuccess: (state) => state.set('statusUpdate', CREATED),
  employeeCreationFailure: (state, action) => state.set('statusUpdate', FAILURE).set('employeeError', action.payload),
};

const employeesFetchingReducer = {
  requestFetchingEmployees: (state) => state.set('statusUpdate', FETCHING).set('employees', []),
  employeesFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('employees', action.payload),
  employeesFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('employees', [])
    .set('employeeError', action.payload),
};

const employeeDeletionReducer = {
  requestEmployeeDeletion: (state) => state.set('statusUpdate', DELETING),
  employeeDeletionSuccess: (state) => state.set('statusUpdate', DELETED),
  employeeDeletionFailure: (state, action) => state.set('statusUpdate', FAILURE).set('employeeError', action.payload),
};

const employeeFetchingReducer = {
  requestFetchingEmployee: (state) => state.set('statusUpdate', PENDING).set('employee', null),
  employeeFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('employee', action.payload),
  employeeFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('employee', null)
    .set('employeeError', action.payload),
};

const employeeUpdatingReducer = {
  requestUpdateEmployee: (state) => state.set('statusUpdate', UPDATING),
  employeeUpdateSuccess: (state) => state.set('statusUpdate', UPDATED),
  employeeUpdateFailure: (state, action) => state.set('statusUpdate', FAILURE).set('employeeError', action.payload),
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    ...createEmployeeReducer,
    ...employeesFetchingReducer,
    ...employeeDeletionReducer,
    ...employeeFetchingReducer,
    ...employeeUpdatingReducer,
  },
});

export const {
  requestEmployeeCreation,
  employeeCreationSuccess,
  employeeCreationFailure,
  requestFetchingEmployees,
  employeesFetchingSuccess,
  employeesFetchingFailure,
  requestEmployeeDeletion,
  employeeDeletionSuccess,
  employeeDeletionFailure,
  requestFetchingEmployee,
  employeeFetchingSuccess,
  employeeFetchingFailure,
  requestUpdateEmployee,
  employeeUpdateSuccess,
  employeeUpdateFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
