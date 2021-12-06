import { combineReducers } from 'redux-immutable';

import employees from './employees/employees.store';

const reducers = combineReducers({
  employees,
});

export default reducers;
