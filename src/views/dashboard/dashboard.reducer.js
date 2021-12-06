import { combineReducers } from 'redux-immutable';

import patient from './content/user/patients/patients.store';
import admin from './content/admin/admin.reducer';
import medicine from './content/medicine/view/medicine.store';
import fee from './content/fee/view/fee.store';
import auths from '../auth/Auth1.store';

const reducers = combineReducers({
  patient,
  medicine,
  fee,
  admin,
  auths,
});

export default reducers;
