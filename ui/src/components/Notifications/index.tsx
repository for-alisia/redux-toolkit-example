import { useDispatch, useSelector } from 'react-redux';
import { removeNotification, getNotifications } from '../../store/slices/layout.slice';
import Notifications from './Notifications';

const NotificationsWrapper = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);

  const onNotificationClose = (id: string) => () => {
    dispatch(removeNotification(id));
  }

  return <Notifications notifications={notifications} onNotificationsClose={onNotificationClose} />
}

export default NotificationsWrapper;

