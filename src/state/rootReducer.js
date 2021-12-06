import { combineReducers } from 'redux-immutable';

import auth from '../views/auth/auth.store';
import dashboard from '../views/dashboard/dashboard.reducer';
import poll from '../views/dashboard/content/poll/poll.store';

const rootReducer = combineReducers({
  poll,
  auth,
  dashboard,
});

export default rootReducer;
