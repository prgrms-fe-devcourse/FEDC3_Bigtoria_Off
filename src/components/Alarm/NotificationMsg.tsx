import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../interfaces/noti';

interface Props {
  noti: Notification;
}

const NOTI_MESSAGE = {
  LIKE: `님이 회원님께 좋아요를 보냈습니다.`,
  FOLLOW: `님이 회원님을 팔로우합니다. `,
  MESSAGE: `님이 회원님께 메세지를 보냈습니다.`,
  COMMENT: `님이 회원님 게시글에 댓글을 남겼습니다.`,
};

const { LIKE, COMMENT, FOLLOW, MESSAGE } = NOTI_MESSAGE;

const NotificationMsg = ({ noti }: Props) => {
  const {
    author: { fullName, image, _id },
    createdAt,
  } = noti;

  const navigate = useNavigate();

  const calcCurrentToCreateDate = (createdAt: string) => {
    if (createdAt === '') return '';

    const curTime = new Date();
    const createdTime = new Date(createdAt);

    const elapsedTime = curTime.getTime() - createdTime.getTime();

    const eDay = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const eHour = Math.floor(elapsedTime / (1000 * 60 * 60));
    const eMinutes = Math.floor(elapsedTime / (1000 * 60));

    if (eDay === 0) {
      if (eHour === 0) return `${eMinutes}분 전`;
      return `${eHour}시간 전`;
    }
    return `${eDay}일 전`;
  };

  const generateMsg = (noti: Notification) => {
    if (noti.like) return `${fullName}${LIKE}`;
    if (noti.comment) return `${fullName}${COMMENT}`;
    if (noti.follow) return `${fullName}${FOLLOW}`;
    if (noti.message) return `${fullName}${MESSAGE}`;
  };

  const handleDeleteClick = () => {
    //Todo: remove alarm
  };

  return (
    <ListItem
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2,
        marginBottom: '12px',
      }}>
      <ListItemButton
        onClick={() => navigate(`/story-book/${_id}`)}
        sx={{
          padding: '10px ',
        }}>
        <ListItemAvatar>
          <Avatar alt={fullName} src={image ? image : ''} />
        </ListItemAvatar>
      </ListItemButton>
      <ListItemText
        primary={generateMsg(noti)}
        secondary={calcCurrentToCreateDate(createdAt || '')}
      />
      <IconButton edge='end' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default NotificationMsg;
