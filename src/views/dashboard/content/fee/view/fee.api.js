import {
  requestFetchingFee,
  feeFetchingSuccess,
  feeFetchingFailure,
  requestFeeCreation,
  feeCreationSuccess,
  feeCreationFailure,
  requestUpdateFee,
  feeUpdateSuccess,
  feeUpdateFailure,
  requestFetchingDoc,
  docFetchingSuccess,
  docFetchingFailure,
} from './fee.store';
import request from '../../../../../common/request';
import { HTTP_STATUS } from '../../../../../common/constants';
import { openNotification } from '../../../../../components/Notification';


export const fetchDoctorsAssociatedPatientsRecord = () => {
  return async (dispatch) => {
    dispatch(requestFetchingDoc());
    try {
      const res = await request.get('/v1/doc');
      dispatch(docFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(docFetchingFailure(err?.response?.data));
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

export const fetchCurrentFee = () => {
  return async (dispatch) => {
    dispatch(requestFetchingFee());
    try {
      const res = await request.get('/v1/fee');
      dispatch(feeFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(feeFetchingFailure(err?.response?.data));
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

export const addFee = (payload) => {
  return async (dispatch) => {
    dispatch(requestFeeCreation());
    try {
      const res = await request.post('/v1/medicine/add', payload);
      if (res.status === HTTP_STATUS.CREATED) {
        dispatch(feeCreationSuccess());
        openNotification({
          type: 'success',
          title: 'Fee Created',
          description: 'Fee Successfully Added',
        });
      }
      return res;
    } catch (err) {
      dispatch(feeCreationFailure());
      if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        openNotification({
          type: 'error',
          title: 'User Login',
          description: 'Invalid Login credentials!',
        });
      } else {
        openNotification({
          type: 'error',
          title: 'Fee',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};

export const updateFee = (payload) => {
  return async (dispatch) => {
    dispatch(requestUpdateFee());
    try {
      const res = await request.put('/v1/fee', payload);
      if (res.status === 200) {
        dispatch(feeUpdateSuccess());
        openNotification({
          type: 'success',
          title: 'Fee Updated',
          description: 'Fee Successfully Updated',
        });
      }
      return res;
    } catch (err) {
      dispatch(feeUpdateFailure());
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
          title: 'Update Fee',
          description: err?.response?.data,
        });
      }
      return null;
    }
  };
};
