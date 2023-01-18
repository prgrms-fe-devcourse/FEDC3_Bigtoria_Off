import {
  Avatar,
  Badge,
  BadgeProps,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

interface Props {
  src?: string;
  size?: string;
  userId: string;
  fullName?: string;
  isOnline?: boolean;
}

const FollowingList = ({
  src,
  size = '50px',
  fullName,
  isOnline,
  userId,
}: Props) => {
  const navigate = useNavigate();

  return (
    <List
      dense
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        borderRadius: '0.5rem',
      }}>
      <ListItem>
        <ListItemAvatar>
          <StateBadge
            isOnline={isOnline}
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'>
            <Avatar
              src={src}
              sx={{ width: size, height: size, cursor: 'pointer' }}
              onClick={() => navigate(ROUTES.STORY_BOOK_BY_USER_ID(userId))}
            />
          </StateBadge>
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          sx={{
            maxWidth: '100px',
            height: '1rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            cursor: 'default',
          }}
        />
      </ListItem>
    </List>
  );
};

export default FollowingList;

interface StateBadgeProps extends BadgeProps {
  isOnline?: boolean;
}

const StateBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})<StateBadgeProps>(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    ...(isOnline
      ? { backgroundColor: '#44b700', color: '#44b700' }
      : { backgroundColor: '#7b7b7b', color: '#7b7b7b' }),
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
      ...(isOnline && {
        animation: 'ripple 1s infinite ease-in-out',
        border: '1px solid currentColor',
      }),
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2)',
      opacity: 0,
    },
  },
}));
