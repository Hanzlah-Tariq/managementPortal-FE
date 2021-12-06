import { notification } from 'antd';

export const openNotification = (props) => {
  notification[props.type]({
    message: props.title,
    description: props.description,
  });
};

export const destroyNotifications = () => {
  notification.destroy();
};

export default {
  openNotification,
  destroyNotifications,
};
