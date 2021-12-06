import get from 'lodash/get';
import request from '../../../../common/request';
import {
  requestFetchingPoll,
  pollFetchingSuccess,
  pollFetchingFailure,
} from './poll.store';
import { HTTP_STATUS } from '../../../../common/constants';
import { openNotification } from '../../../../components/Notification';
import storage from '../../../../common/storage';

export const fetchPoll = () => {
  return async (dispatch) => {
    dispatch(requestFetchingPoll());
    try {
      const userId = get(storage.get('user'), 'user.id');
      const res = await request.get(`/v1/poll/${userId}`);
      dispatch(pollFetchingSuccess(res.data || {}));
      return res;
    } catch (err) {
      dispatch(pollFetchingFailure(err?.response?.data));
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
