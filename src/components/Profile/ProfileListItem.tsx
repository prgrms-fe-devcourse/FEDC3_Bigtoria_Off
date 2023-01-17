import { Button, ListItem, ListItemText } from '@mui/material';

interface Props {
  title: string;
  content: string;
  onClick: () => void;
}

const ProfileListItem = ({ title, content, onClick }: Props) => {
  return (
    <ListItem>
      <ListItemText primary={title} sx={{ fontWeight: '500' }} />
      <span>{content}</span>
      <Button>수정</Button>
    </ListItem>
  );
};

export default ProfileListItem;
