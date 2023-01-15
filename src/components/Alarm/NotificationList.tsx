import { List } from '@mui/material';
import { useEffect, useState } from 'react';

import { Notification } from '../../interfaces/noti';
import NotificationMsg from './NotificationMsg';

/* Todo
 * 2. message탭인지, post탭인지 알려주자.
 *   - message: 나에게 온 메세지
 *   - post: 내 게시글에 댓글, 좋아요
 *   - 나를 팔로우한 알림은 어디로 보내야 하는가...
 */
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
      {type === 'message'
        ? msgList?.map((n, i) => <NotificationMsg key={i} noti={n} />)
        : postList?.map((n, i) => <NotificationMsg key={i} noti={n} />)}
    </List>
  );
};

export default NotificationList;
