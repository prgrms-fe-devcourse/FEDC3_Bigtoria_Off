import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  src: string | undefined;
  size?: string;
  fullName: string | undefined;
  isOnline: boolean | undefined;
}

const FollowingList = ({ src, size = '50px', fullName, isOnline }: Props) => {
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
          {isOnline ? (
            <OnlineBadge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'>
              <Avatar src={src} sx={{ width: size, height: size }} />
            </OnlineBadge>
          ) : (
            <OfflineBadge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'>
              <Avatar src={src} sx={{ width: size, height: size }} />
            </OfflineBadge>
          )}
        </ListItemAvatar>
        <ListItemText primary={fullName} />
      </ListItem>
    </List>
  );
};

export default FollowingList;

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
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

const OfflineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#7b7b7b',
    color: '#7b7b7b',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      content: '""',
    },
  },
}));
