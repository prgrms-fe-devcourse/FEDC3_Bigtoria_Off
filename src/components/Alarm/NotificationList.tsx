import { List } from '@mui/material';

import NotificationMsg from './NotificationMsg';

/* Todo
 * 1. otificaton -> Notification[]로 타입 교체
 * 2. message탭인지, post탭인지 알려주자.
 *   - message: 나에게 온 메세지
 *   - post: 내 게시글에 댓글, 좋아요
 *   - 나를 팔로우한 알림은 어디로 보내야 하는가...
 */
interface Props {
  type: string;
}

const NotificationList = ({ type }: Props) => {
  //TODO
  // - notification 배열 받아서 처리
  // - type에 따라 data 가공?
  const dummyMsgArr = [
    '메세지 알림 정보',
    '메세지 알림 정보',
    '메세지 알림 정보',
    '메세지 알림 정보',
  ];

  const dummyPostArr = [
    '게시글 알림 정보',
    '게시글 알림 정보',
    '게시글 알림 정보',
    '게시글 알림 정보',
  ];

  return (
    <List
      sx={{
        width: '100%',
      }}
    >
      {type === 'message'
        ? dummyMsgArr.map((m, i) => <NotificationMsg key={i} message={m} />)
        : dummyPostArr.map((m, i) => <NotificationMsg key={i} message={m} />)}
    </List>
  );
};

export default NotificationList;
