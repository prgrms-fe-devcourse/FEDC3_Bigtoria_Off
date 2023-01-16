import { List } from '@mui/material';
import { useEffect, useState } from 'react';

import { Notification } from '../../interfaces/notification';
import NotificationMsg from './NotificationMsg';

const MESSAGE = 'message';

interface Props {
  type: string;
  notifications: Notification[];
}

const NotificationList = ({ type, notifications }: Props) => {
  const [msgList, setMsgList] = useState<Notification[]>([]);
  const [postList, setPostList] = useState<Notification[]>([]);

  const filteredPostNotification = (notifications: Notification[]) => {
    const filteredNoti = notifications?.filter(
      (noti) => noti.like || noti.comment
    );

    setPostList(filteredNoti || []);
  };

  const filteredMsgNotification = (notifications: Notification[]) => {
    const filteredNoti = notifications?.filter(
      (noti) => noti.follow || noti.message
    );

    setMsgList(filteredNoti || []);
  };

  useEffect(() => {
    filteredPostNotification(notifications);
    filteredMsgNotification(notifications);
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
