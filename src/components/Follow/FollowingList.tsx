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
import { useState } from 'react';

import FollowModal from './FollowModal';

interface Props {
  userInfo: {
    image?: string;
    user: string;
    fullName?: string;
    username?: string;
    coverImage?: string;
    isOnline?: boolean;
  };
}

const FollowingList = ({ userInfo }: Props) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

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
            isOnline={userInfo.isOnline}
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'>
            <Avatar
              src={userInfo.image}
              sx={{
                width: '60px',
                height: '60px',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          </StateBadge>
        </ListItemAvatar>
        <ListItemText
          primary={userInfo.fullName}
          sx={{
            display: 'block',
            marginLeft: '1rem',
          }}
        />
      </ListItem>
      <FollowModal open={open} onClick={handleClick} userInfo={userInfo} />
    </List>
  );
};

export default FollowingList;

interface StateBadgeProps extends BadgeProps {
  isOnline?: boolean;
}

export const StateBadge = styled(Badge, {
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
