import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Employee from './EmployeeDetails.view';
import { fetchEmployee } from '../employees.api';

const EmployeeDetailsContainer = () => {
  const dispatch = useDispatch();

  const props = {
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate'])),
    employee: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'employee'])),
    fetchEmployee: (id) => dispatch(fetchEmployee(id)),
  };
  return <Employee {...props} />;
};

export default EmployeeDetailsContainer;
