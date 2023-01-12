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
  fullName: string;
}

const FollowingList = ({ src, size = '80px', fullName }: Props) => {
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
        <ListItemText primary={fullName} />
      </ListItem>
    </List>
  );
};

export default FollowingList;
