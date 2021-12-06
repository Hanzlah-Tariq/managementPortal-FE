import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import {
  PENDING, INACTIVE, FETCHED, FAILURE,
} from '../../../../common/constants';

const initialState = Map({
  statusUpdate: INACTIVE,
  poll: {},
  pollError: null,
});


const pollFetchingReducer = {
  requestFetchingPoll: (state) => state.set('statusUpdate', PENDING).set('poll', null),
  pollFetchingSuccess: (state, action) => state.set('statusUpdate', FETCHED).set('poll', action.payload.poll),
  pollFetchingFailure: (state, action) => state
    .set('statusUpdate', FAILURE)
    .set('poll', null)
    .set('pollError', action.payload),
};

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    ...pollFetchingReducer,
  },
});

export const {
  requestFetchingPoll,
  pollFetchingSuccess,
  pollFetchingFailure,
} = pollSlice.actions;

export default pollSlice.reducer;
