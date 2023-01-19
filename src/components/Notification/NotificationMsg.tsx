import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/routes';
import { Notification } from '../../interfaces/notification';
import { calcCreatedToCurrentDate } from '../../utils/calcCreatedToCurrentTime';

interface Props {
  notification: Notification;
}

interface NOTI_TYPE {
  [keyword: string]: {
    FRONT: string;
    MIDDLE: string;
    REAR: string;
  };
}

const NOTI_TYPE = {
  LIKE: 'LIKE',
  COMMENT: 'COMMENT',
  FOLLOW: 'FOLLOW',
  MESSAGE: 'MESSAGE',
};

const NOTI_MESSAGE: NOTI_TYPE = {
  LIKE: {
    FRONT: '님이 회원님께 ',
    MIDDLE: '좋아요',
    REAR: '를 보냈습니다',
  },
  COMMENT: {
    FRONT: '님이 회원님 게시글에 ',
    MIDDLE: '댓글',
    REAR: '을 보냈습니다',
  },
  FOLLOW: {
    FRONT: '님이 회원님을 ',
    MIDDLE: '팔로우',
    REAR: '합니다',
  },
  MESSAGE: {
    FRONT: '님이 회원님께 ',
    MIDDLE: '메세지',
    REAR: '를 보냈습니다',
  },
};

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

  const getTotalMsg = (front: string, middle: string, rear: string) => {
    return (
      <Typography component='span'>
        {fullName}
        {front}
        <Typography component='span' color={COLORS.SUB}>
          {middle}
        </Typography>
        {rear}
      </Typography>
    );
  };

  const getMsgType = () => {
    if (like) return NOTI_TYPE.LIKE;
    else if (comment) return NOTI_TYPE.COMMENT;
    else if (follow) return NOTI_TYPE.FOLLOW;
    else return NOTI_TYPE.MESSAGE;
  };

  const generateMsg = () => {
    const msgType = getMsgType();

    return getTotalMsg(
      NOTI_MESSAGE[msgType].FRONT,
      NOTI_MESSAGE[msgType].MIDDLE,
      NOTI_MESSAGE[msgType].REAR
    );
  };

  const generateAvatar = () => {
    if (like) return <ThumbUp />;
    if (comment) return <CommentIcon />;
    if (follow)
      return (
        <Avatar
          sx={{
            backgroundColor: `${!image ? COLORS.SUB : ''}`,
          }}
          alt={fullName}
          src={image ? image : ''}
        />
      );
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

  return (
    <ListItem
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2,
        marginBottom: '12px',
        padding: 0,
        backgroundColor: 'white',
      }}>
      <ListItemButton onClick={handleListItemClick}>
        <ListItemAvatar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '5px',
          }}>
          <Badge
            variant='dot'
            color='warning'
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
          sx={{
            paddingTop: '5px',
            paddingRight: '10px',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NotificationMsg;
