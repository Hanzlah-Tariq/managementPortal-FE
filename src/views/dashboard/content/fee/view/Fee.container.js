import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Fee from './Fee.view';
import {
  addFee, fetchCurrentFee, updateFee, fetchDoctorsAssociatedPatientsRecord,
} from './fee.api';

const FeeContainer = () => {
  const dispatch = useDispatch();

  const props = {
    fee: useSelector((state) => state.getIn(['dashboard', 'fee', 'fee'])),
    doc: useSelector((state) => state.getIn(['dashboard', 'fee', 'doc'])),
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'fee', 'statusUpdate'])),
    addFee: (payload) => dispatch(addFee(payload)),
    fetchCurrentFee: () => dispatch(fetchCurrentFee()),
    updateFee: (payload) => dispatch(updateFee(payload)),
    // eslint-disable-next-line max-len
    fetchDoctorsAssociatedPatientsRecord: (payload) => dispatch(fetchDoctorsAssociatedPatientsRecord(payload)),
  };

  return <Fee {...props} />;
};

export default FeeContainer;
