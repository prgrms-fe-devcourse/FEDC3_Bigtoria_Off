import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

interface Props {
  src: string | undefined;
  size?: string;
  fullName: string | undefined;
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
          <Avatar
            src={src}
            sx={{ width: size, height: size, marginRight: '0.5rem' }}
          />
        </ListItemAvatar>
        <ListItemText primary={fullName} />
      </ListItem>
    </List>
  );
};

export default FollowingList;
