import request from '../../../../../common/request';
import { HTTP_STATUS } from '../../../../../common/constants';
import { openNotification } from '../../../../../components/Notification';

import {
  requestEmployeeCreation,
  employeeCreationSuccess,
  employeeCreationFailure,
  requestFetchingEmployees,
  employeesFetchingSuccess,
  employeesFetchingFailure,
  requestEmployeeDeletion,
  employeeDeletionSuccess,
  employeeDeletionFailure,
  requestFetchingEmployee,
  employeeFetchingSuccess,
  employeeFetchingFailure,
  requestUpdateEmployee,
  employeeUpdateSuccess,
  employeeUpdateFailure,
} from './employees.store';

const form = (payload, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('age', payload.age);
  formData.append('gender', payload.gender);
  formData.append('designation', payload.designation);
  formData.append('address', payload.address);
  return { formData };
};

export const createEmployee = (payload, file) => {
  const { formData } = form(payload, file);
  return async (dispatch) => {
    dispatch(requestEmployeeCreation());

    try {
      const res = await request.post('/v1/employee/create', formData);
      if (res.status === HTTP_STATUS.CREATED) {
        dispatch(employeeCreationSuccess());
        openNotification({
          type: 'success',
          title: 'Employee Created',
          description: 'Employee Successfully Registered',
        });
      }
      return res;
    } catch (err) {
      dispatch(employeeCreationFailure());
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'Employee',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};

export const fetchEmployees = () => {
  return async (dispatch) => {
    dispatch(requestFetchingEmployees());
    try {
      const res = await request.get('/v1/employee');
      dispatch(employeesFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(employeesFetchingFailure(err));
      if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else if (err?.response?.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'Not Found',
          description: 'Resource Not Found!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }
      return null;
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(requestEmployeeDeletion());
    try {
      const res = await request.delete(`/v1/employee/${id}`);
      if (res.status === 200) {
        dispatch(employeeDeletionSuccess());
        openNotification({
          type: 'success',
          title: 'Employee Deleted',
          description: 'Employee Successfully Deleted',
        });
      }
      return res;
    } catch (err) {
      dispatch(employeeDeletionFailure);
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'Not Found',
          description: 'Resource Not Found!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }
      return null;
    }
  };
};

export const fetchEmployee = (id) => {
  return async (dispatch) => {
    dispatch(requestFetchingEmployee());
    try {
      const res = await request.get(`/v1/employee/${id}`);
      dispatch(employeeFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(employeeFetchingFailure(err));
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'Not Found',
          description: 'Resource Not Found!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Some thing went wrong while making the request',
        });
      }
      return null;
    }
  };
};

export const updateEmployee = (id, payload, file) => {
  const { formData } = form(payload, file);
  return async (dispatch) => {
    dispatch(requestUpdateEmployee());
    try {
      const res = await request.put(`/v1/employee/${id}`, formData);
      if (res.status === 200) {
        dispatch(employeeUpdateSuccess());
        openNotification({
          type: 'success',
          title: 'Employee Updated',
          description: 'Employee Successfully Updated',
        });
      }
      return res;
    } catch (err) {
      dispatch(employeeUpdateFailure());
      if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
        openNotification({
          type: 'error',
          title: 'Not Found',
          description: 'Resource Not Found!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'Update Employee',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};
