import CommentIcon from '@mui/icons-material/Comment';
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

import { getStoryDetail } from '../../apis/story';
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
    if (comment) return NOTI_TYPE.COMMENT;
    return NOTI_TYPE.FOLLOW;
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
  };

  const handleListItemClick = async () => {
    if ((like || comment) && post)
      navigate(STORY_BY_STORY_ID(post), { state: await getStoryDetail(post) });
    if (follow) navigate(STORY_BOOK_BY_USER_ID(follow.follower));
  };

  return (
    <ListItem
      sx={{
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2.5,
        marginBottom: '12px',
        padding: 0,
      }}>
      <ListItemButton
        sx={{ borderRadius: 2.5, padding: '8px 8px' }}
        onClick={handleListItemClick}>
        <ListItemAvatar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '8px',
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
