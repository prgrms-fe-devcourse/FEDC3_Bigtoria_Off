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
    const filteredNoti = notifications?.filter((n) => n.like || n.comment);

    setPostList(filteredNoti || []);
  };

  const filteredMsgNotification = (notifications: Notification[]) => {
    const filteredNoti = notifications?.filter((n) => n.follow || n.message);

    setMsgList(filteredNoti || []);
  };

  //Thinking: BadgeCount처럼 실시간으로 계속 반영할 지, 사용자에게 탭키를 누르게 강요할지
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
