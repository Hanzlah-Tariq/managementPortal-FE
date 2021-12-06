import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EmployeesView from './Employees.view';

import {
  createEmployee,
  fetchEmployees,
  deleteEmployee,
  fetchEmployee,
  updateEmployee,
} from './employees.api';

const EmployeesContainer = () => {
  const dispatch = useDispatch();

  const props = {
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate'])),
    employees: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'employees'])),
    employee: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'employee'])),
    createEmployee: (payload, file) => dispatch(createEmployee(payload, file)),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchEmployee: (id) => dispatch(fetchEmployee(id)),
    updateEmployee: (id, payload, file) => dispatch(updateEmployee(id, payload, file)),
    deleteEmployee: (id) => dispatch(deleteEmployee(id)),
  };

  return <EmployeesView {...props} />;
};

export default EmployeesContainer;
