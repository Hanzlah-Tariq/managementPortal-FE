import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import {
  PENDING, FETCHED, INACTIVE, FAILURE, CREATED, UPDATING, UPDATED,
} from '../../../../../common/constants';


const initialState = Map({
  statusUpdate: INACTIVE,
  fee: 0,
  doc: [],
  feeError: null,
});


const feeFetchingReducer = {
  requestFetchingFee: (state) => state.set('statusUpdate', PENDING),
  feeFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('fee', action.payload.fee.fee),
  feeFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('fee', '')
    .set('feeError', action.payload),
};

const docFetchingReducer = {
  requestFetchingDoc: (state) => state.set('statusUpdate', PENDING),
  docFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('doc', action.payload.doc),
  docFetchingFailure: (state) => state.set('statusUpdate', FAILURE).set('doc', ''),
};

const addFeeReducer = {
  requestFeeCreation: (state) => state.set('statusUpdate', PENDING),
  feeCreationSuccess: (state) => state.set('statusUpdate', CREATED),
  feeCreationFailure: (state, action) => state.set('statusUpdate', FAILURE).set('feeError', action.payload),
};

const feeUpdatingReducer = {
  requestUpdateFee: (state) => state.set('statusUpdate', UPDATING),
  feeUpdateSuccess: (state) => state.set('statusUpdate', UPDATED),
  feeUpdateFailure: (state, action) => state.set('statusUpdate', FAILURE).set('feeError', action.payload),
};

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    ...feeFetchingReducer,
    ...addFeeReducer,
    ...feeUpdatingReducer,
    ...docFetchingReducer,
  },
});

export const {
  requestFetchingFee,
  feeFetchingSuccess,
  feeFetchingFailure,
  requestFeeCreation,
  feeCreationSuccess,
  feeCreationFailure,
  requestUpdateFee,
  feeUpdateSuccess,
  feeUpdateFailure,
  requestFetchingDoc,
  docFetchingSuccess,
  docFetchingFailure,
} = feeSlice.actions;

export default feeSlice.reducer;
