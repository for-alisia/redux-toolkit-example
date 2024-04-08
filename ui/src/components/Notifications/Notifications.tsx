import { createPortal } from 'react-dom';
import { Alert } from 'antd';
import { Notification } from '../../store/slices/layout.slice';

type NotificationsProps = {
  notifications: Notification[];
  onNotificationsClose: (id: string) => () => void;
}
const Notifications: React.FC<NotificationsProps> = ({ notifications, onNotificationsClose }) => (
  <div>
    {createPortal(
      (<ul style={{ position: 'absolute', zIndex: 1000, top: 0, right: 0, listStyleType: 'none', width: '100%' }}>
        {notifications.map(({ message, type, id }) => (
          <li key={id}>
            <Alert message={message} type={type} banner closable onClose={onNotificationsClose(id)}/>
          </li>
        ))}
        </ul>),
    document.body
  )}
  </div>
);

export default Notifications;