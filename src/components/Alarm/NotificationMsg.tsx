import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItem, ListItemText } from '@mui/material';

interface Props {
  message: string;
}

const NotificationMsg = ({ message }: Props) => {
  const handleDeleteClick = () => {
    //Todo: remove alarm
  };

  return (
    <ListItem
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.06)',
        borderRadius: 2,
        marginBottom: '12px',
      }}>
      <ListItemText primary={message} />
      <IconButton edge='end' aria-label='delete' onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default NotificationMsg;
