import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Poll from './Poll.view';
import { fetchPoll } from './poll.api';
import { fetchPatients } from '../user/patients/patients.api';


const PollContainer = () => {
  const dispatch = useDispatch();

  const props = {
    statusUpdate: useSelector((state) => state.getIn(['poll', 'statusUpdate'])),
    poll: useSelector((state) => state.getIn(['poll', 'poll'])),
    fetchPoll: () => dispatch(fetchPoll()),
    fetchPatients: () => dispatch(fetchPatients()),
  };

  return <Poll {...props} />;
};

export default PollContainer;
