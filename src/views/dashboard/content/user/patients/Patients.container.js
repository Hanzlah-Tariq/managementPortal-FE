import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PatientsView from './Patients.view';

import {
  createPatient,
  fetchPatients,
  deletePatient,
  fetchPatient,
  updatePatient,
} from './patients.api';

import { fetchEmployees } from '../../admin/employees/employees.api';
import { fetchAllMedicines } from '../../medicine/view/medicine.api';

const PatientsContainer = () => {
  const dispatch = useDispatch();

  const props = {
    user: useSelector((state) => state.getIn(['dashboard', 'auths', 'user'])),
    isFetchingEmployees: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate'])),
    employees: useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'employees'])),
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'patient', 'statusUpdate'])),
    patients: useSelector((state) => state.getIn(['dashboard', 'patient', 'patients'])),
    patient: useSelector((state) => state.getIn(['dashboard', 'patient', 'patient'])),
    medicines: useSelector((state) => state.getIn(['dashboard', 'medicine', 'medicines'])),
    createPatient: (payload, file) => dispatch(createPatient(payload, file)),
    fetchPatients: () => dispatch(fetchPatients()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchPatient: (id) => dispatch(fetchPatient(id)),
    updatePatient: (id, payload, file) => dispatch(updatePatient(id, payload, file)),
    deletePatient: (id) => dispatch(deletePatient(id)),
    fetchAllMedicines: () => dispatch(fetchAllMedicines()),
  };

  return <PatientsView {...props} />;
};

export default PatientsContainer;
