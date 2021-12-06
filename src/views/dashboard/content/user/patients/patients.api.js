import request from '../../../../../common/request';
import { HTTP_STATUS } from '../../../../../common/constants';
import { openNotification } from '../../../../../components/Notification';

import {
  requestPatientCreation,
  patientCreationSuccess,
  patientCreationFailure,
  requestFetchingPatients,
  patientsFetchingSuccess,
  patientsFetchingFailure,
  requestPatientDeletion,
  patientDeletionSuccess,
  patientDeletionFailure,
  requestFetchingPatient,
  patientFetchingSuccess,
  patientFetchingFailure,
  requestUpdatePatient,
  patientUpdateSuccess,
  patientUpdateFailure,
} from './patients.store';

const form = (payload) => {
  return {
    name: payload.name,
    age: payload.age,
    gender: payload.gender,
    email: payload.doctor,
    medicine: payload.medicine,
    disease: payload.disease,
    status: payload.status,
  };
};

export const createPatient = (payload) => {
  return async (dispatch) => {
    dispatch(requestPatientCreation());

    try {
      const res = await request.post('/v1/patient/create', form(payload));
      if (res.status === HTTP_STATUS.CREATED) {
        dispatch(patientCreationSuccess());
        openNotification({
          type: 'success',
          title: 'Patient Added',
          description: 'Patient Successfully Added',
        });
      }
      return res;
    } catch (err) {
      dispatch(patientCreationFailure(err?.response?.data));
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

export const fetchPatients = () => {
  return async (dispatch) => {
    dispatch(requestFetchingPatients());
    try {
      const res = await request.get('/v1/patient');
      dispatch(patientsFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(patientsFetchingFailure(err));
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

export const deletePatient = (id) => {
  return async (dispatch) => {
    dispatch(requestPatientDeletion());
    try {
      const res = await request.delete(`/v1/patient/${id}`);
      dispatch(patientDeletionSuccess());
      if (res.status === 200) {
        openNotification({
          type: 'success',
          title: 'Patient Deleted',
          description: 'Patient Successfully Deleted',
        });
      }
      return res;
    } catch (err) {
      dispatch(patientDeletionFailure);
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

export const fetchPatient = (id) => {
  return async (dispatch) => {
    dispatch(requestFetchingPatient());
    try {
      const res = await request.get(`/v1/patient/${id}`);
      dispatch(patientFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(patientFetchingFailure(err));
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

export const updatePatient = (id, payload) => {
  return async (dispatch) => {
    dispatch(requestUpdatePatient());
    try {
      const res = await request.put(`/v1/patient/${id}`, form(payload));
      if (res.status === 200) {
        dispatch(patientUpdateSuccess());
        openNotification({
          type: 'success',
          title: 'Patient Updated',
          description: 'Patient Successfully Updated',
        });
      }
      return res;
    } catch (err) {
      dispatch(patientUpdateFailure(err?.response?.data));
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
