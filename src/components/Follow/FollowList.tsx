import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

interface Props {
  src: string;
  size?: string;
  hover?: boolean;
}

const FollowList = ({ src, size = '80px' }: Props) => {
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
          <Avatar src={src} sx={{ width: size, height: size }} />
        </ListItemAvatar>
        <ListItemText primary='fullName' />
      </ListItem>
    </List>
  );
};

export default FollowList;
