import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import { useDeleteComment } from '../../hooks/useComment';
import { Comment } from '../../interfaces/comment';

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const { handleDelete } = useDeleteComment(comment);

  return (
    <ListItem
      secondaryAction={<IconButton edge='end' aria-label='delete'></IconButton>}
      sx={{ paddingRight: 0 }}
    >
      <ListItemAvatar>
        <Avatar alt='profile image' src={comment.author?.image} />
      </ListItemAvatar>
      <ListItemText
        primary={comment.author?.fullName}
        secondary={comment.comment}
      />
      <Button variant='text' onClick={handleDelete}>
        삭제
      </Button>
    </ListItem>
  );
};

export default CommentItem;
