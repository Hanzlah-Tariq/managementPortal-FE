import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import {
  PENDING, INACTIVE, FETCHED, FAILURE, DELETING, DELETED, UPDATING, UPDATED, CREATED, FETCHING,
} from '../../../../../common/constants';

const initialState = Map({
  statusUpdate: INACTIVE,
  medicines: [],
  medicineError: null,
});

const medicineFetchingReducer = {
  requestFetchingMedicines: (state) => state.set('statusUpdate', FETCHING).set('medicines', []),
  medicinesFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('medicines', action.payload.medicines),
  medicinesFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('medicines', [])
    .set('medicineError', action.payload),
};

const createMedicineReducer = {
  requestMedicineCreation: (state) => state.set('statusUpdate', PENDING),
  medicineCreationSuccess: (state) => state.set('statusUpdate', CREATED),
  medicineCreationFailure: (state, action) => state.set('statusUpdate', FAILURE).set('medicineError', action.payload),
};

const medicineDeletionReducer = {
  requestMedicineDeletion: (state) => state.set('statusUpdate', DELETING),
  medicineDeletionSuccess: (state) => state.set('statusUpdate', DELETED),
  medicineDeletionFailure: (state, action) => state.set('statusUpdate', FAILURE).set('medicineError', action.payload),
};

const medicineUpdatingReducer = {
  requestUpdateMedicine: (state) => state.set('statusUpdate', UPDATING),
  medicineUpdateSuccess: (state) => state.set('statusUpdate', UPDATED),
  medicineUpdateFailure: (state, action) => state.set('statusUpdate', FAILURE).set('medicineError', action.payload),
};

const medicineSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    ...medicineFetchingReducer,
    ...medicineDeletionReducer,
    ...medicineUpdatingReducer,
    ...createMedicineReducer,
  },
});

export const {
  requestFetchingMedicines,
  medicinesFetchingSuccess,
  medicinesFetchingFailure,
  requestMedicineDeletion,
  medicineDeletionSuccess,
  medicineDeletionFailure,
  requestUpdateMedicine,
  medicineUpdateSuccess,
  medicineUpdateFailure,
  requestMedicineCreation,
  medicineCreationSuccess,
  medicineCreationFailure,
} = medicineSlice.actions;

export default medicineSlice.reducer;
