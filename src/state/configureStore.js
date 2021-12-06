import { configureStore } from '@reduxjs/toolkit';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './rootReducer';

const logger = createLogger();

const configStore = (preloadedState) => configureStore({
  reducer: reducers,
  middleware: [thunk, logger],
  preloadedState,
});

export default configStore;
