import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Patient from './PatientDetails.view';
import { fetchPatient } from '../patients.api';

const PatientDetailsContainer = () => {
  const dispatch = useDispatch();

  const props = {
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'patient', 'statusUpdate'])),
    patient: useSelector((state) => state.getIn(['dashboard', 'patient', 'patient'])),
    fetchPatient: (id) => dispatch(fetchPatient(id)),
  };
  return <Patient {...props} />;
};

export default PatientDetailsContainer;
