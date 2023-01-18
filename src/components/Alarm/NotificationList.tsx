import { List } from '@mui/material';
import { useEffect, useState } from 'react';

import { Notification } from '../../interfaces/notification';
import { isExpiredDate } from '../../utils/calcCreatedToCurrentTime';
import NotificationMsg from './NotificationMsg';

const MESSAGE = 'message';

interface Props {
  type: string;
  notifications: Notification[];
}

const NotificationList = ({ type, notifications }: Props) => {
  const [msgList, setMsgList] = useState<Notification[]>([]);
  const [postList, setPostList] = useState<Notification[]>([]);

  const filterNotification = (notifications: Notification[]) => {
    const filteredNotSeenOrUnexpired = notifications.filter(
      (n) => !n.seen || (n.seen && !isExpiredDate(n.createdAt || ''))
    );

    setPostList(filteredNotSeenOrUnexpired.filter((n) => n.like || n.comment));
    setMsgList(filteredNotSeenOrUnexpired.filter((n) => n.follow || n.message));
  };

  useEffect(() => {
    filterNotification(notifications);
  }, [notifications]);

  return (
    <List
      sx={{
        width: '100%',
      }}>
      {type === MESSAGE
        ? msgList?.map((n, i) => <NotificationMsg key={i} notification={n} />)
        : postList?.map((n, i) => <NotificationMsg key={i} notification={n} />)}
    </List>
  );
};

export default NotificationList;
