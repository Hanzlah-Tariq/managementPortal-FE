import request from '../../../../../common/request';
import {
  requestFetchingMedicines,
  medicinesFetchingSuccess,
  medicinesFetchingFailure,
  requestMedicineDeletion,
  medicineDeletionSuccess,
  medicineDeletionFailure,
  requestUpdateMedicine,
  medicineUpdateSuccess,
  medicineUpdateFailure,
  requestMedicineCreation,
  medicineCreationSuccess,
  medicineCreationFailure,
} from './medicine.store';
import { HTTP_STATUS } from '../../../../../common/constants';
import { openNotification } from '../../../../../components/Notification';

export const fetchAllMedicines = () => {
  return async (dispatch) => {
    dispatch(requestFetchingMedicines());
    try {
      const res = await request.get('/v1/medicine');
      dispatch(medicinesFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(medicinesFetchingFailure(err?.response?.data));
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

export const addMedicine = (payload) => {
  return async (dispatch) => {
    dispatch(requestMedicineCreation());
    try {
      const res = await request.post('/v1/medicine/add', payload);
      if (res.status === HTTP_STATUS.CREATED) {
        dispatch(medicineCreationSuccess());
        openNotification({
          type: 'success',
          title: 'Medicine Added',
          description: 'Medicine Successfully Added',
        });
      }
      return res;
    } catch (err) {
      dispatch(medicineCreationFailure());
      if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'Medicine',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};

export const deleteMedicine = (id) => {
  return async (dispatch) => {
    dispatch(requestMedicineDeletion());
    try {
      const res = await request.delete(`/v1/medicine/${id}`);
      if (res.status === 200) {
        dispatch(medicineDeletionSuccess());
        openNotification({
          type: 'success',
          title: 'Medicine Deleted',
          description: 'Medicine Successfully Deleted',
        });
      }
      return res;
    } catch (err) {
      dispatch(medicineDeletionFailure);
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

export const updateMedicine = (id, payload) => {
  return async (dispatch) => {
    dispatch(requestUpdateMedicine());
    try {
      const res = await request.put(`/v1/medicine/${id}`, payload);
      if (res.status === 200) {
        dispatch(medicineUpdateSuccess());
        openNotification({
          type: 'success',
          title: 'Medicine Updated',
          description: 'Medicine Successfully Updated',
        });
      }
      return res;
    } catch (err) {
      dispatch(medicineUpdateFailure());
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
          title: 'Update Medicine',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};
