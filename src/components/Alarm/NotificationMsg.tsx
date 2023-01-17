import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
  Avatar,
  Badge,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import { Notification } from '../../interfaces/notification';
import { calcCreatedToCurrentDate } from '../../utils/calcCreatedToCurrentTime';

interface Props {
  notification: Notification;
}

const NOTI_MESSAGE = {
  LIKE: `님이 회원님께 좋아요를 보냈습니다.`,
  FOLLOW: `님이 회원님을 팔로우합니다. `,
  MESSAGE: `님이 회원님께 메세지를 보냈습니다.`,
  COMMENT: `님이 회원님 게시글에 댓글을 남겼습니다.`,
};

const { LIKE, COMMENT, FOLLOW, MESSAGE } = NOTI_MESSAGE;

const { STORY_BOOK_BY_USER_ID, STORY_BY_STORY_ID } = ROUTES;

const NotificationMsg = ({ notification }: Props) => {
  const {
    seen,
    author: { fullName, image },
    like,
    post,
    follow,
    comment,
    message,
    createdAt,
  } = notification;
  const navigate = useNavigate();

  const generateMsg = () => {
    if (like) return `${fullName}${LIKE}`;
    if (comment) return `${fullName}${COMMENT}`;
    if (follow) return `${fullName}${FOLLOW}`;
    if (message) return `${fullName}${MESSAGE}`;
  };

  const generateAvatar = () => {
    if (like) return <ThumbUp />;
    if (comment) return <CommentIcon />;
    if (follow) return <Avatar alt={fullName} src={image ? image : ''} />;
    if (message) return <SendIcon />;
  };

  //TODO
  //1. like, comment => 게시글로 이동 (o)
  //2. follow => 사용자 프로필로 이동 (o)
  //3. message => 메세지 대화창으로 이동
  const handleListItemClick = () => {
    if ((like || comment) && post) navigate(STORY_BY_STORY_ID(post));
    if (follow) navigate(STORY_BOOK_BY_USER_ID(follow.follower));
    if (message) '';
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
        padding: 0,
      }}>
      <ListItemButton onClick={handleListItemClick}>
        <ListItemAvatar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Badge
            variant='dot'
            color='primary'
            invisible={seen}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            {generateAvatar()}
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={generateMsg()}
          secondary={calcCreatedToCurrentDate(createdAt || '')}
        />
        <IconButton edge='end' aria-label='delete' onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};

export default NotificationMsg;
