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
  patients: [],
  patient: null,
  patientError: null,
});

const createPatientReducer = {
  requestPatientCreation: (state) => state.set('statusUpdate', PENDING),
  patientCreationSuccess: (state) => state.set('statusUpdate', CREATED),
  patientCreationFailure: (state, action) => state.set('statusUpdate', FAILURE).set('patientError', action.payload),
};

const patientsFetchingReducer = {
  requestFetchingPatients: (state) => state.set('statusUpdate', FETCHING).set('patients', []),
  patientsFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('patients', action.payload),
  patientsFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('patients', [])
    .set('patientError', action.payload),
};

const patientsDeletionReducer = {
  requestPatientDeletion: (state) => state.set('statusUpdate', DELETING),
  patientDeletionSuccess: (state) => state.set('statusUpdate', DELETED),
  patientDeletionFailure: (state, action) => state.set('statusUpdate', FAILURE).set('patientError', action.payload),
};

const patientFetchingReducer = {
  requestFetchingPatient: (state) => state.set('statusUpdate', PENDING).set('patient', null),
  patientFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('patient', action.payload),
  patientFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('patient', null)
    .set('patientError', action.payload),
};

const patientsUpdatingReducer = {
  requestUpdatePatient: (state) => state.set('statusUpdate', UPDATING),
  patientUpdateSuccess: (state) => state.set('statusUpdate', UPDATED),
  patientUpdateFailure: (state, action) => state.set('statusUpdate', FAILURE).set('patientError', action.payload),
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    ...createPatientReducer,
    ...patientsFetchingReducer,
    ...patientsDeletionReducer,
    ...patientFetchingReducer,
    ...patientsUpdatingReducer,
  },
});

export const {
  requestPatientCreation,
  patientCreationSuccess,
  patientCreationFailure,
  requestFetchingPatients,
  patientsFetchingSuccess,
  patientsFetchingFailure,
  requestPatientDeletion,
  patientDeletionSuccess,
  patientDeletionFailure,
  requestFetchingPatient,
  patientFetchingSuccess,
  patientFetchingFailure,
  requestUpdatePatient,
  patientUpdateSuccess,
  patientUpdateFailure,
} = patientSlice.actions;

export default patientSlice.reducer;
