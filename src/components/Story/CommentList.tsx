import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import useFetchUser from '../../hooks/useFetchUser';
import { Comment } from '../../interfaces/comment';

interface Props {
  comments: Comment[];
  handleDelete: (commentId: string) => void;
  hasToken: boolean;
}

const CommentList = ({ comments, handleDelete, hasToken }: Props) => {
  const { user } = useFetchUser();

  return (
    <List>
      {comments.map((comment) => (
        <ListItem
          key={comment._id}
          secondaryAction={
            <IconButton edge='end' aria-label='delete'></IconButton>
          }
          sx={{ paddingRight: 0 }}>
          <ListItemAvatar>
            <Avatar alt='profile image' src={comment.author?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.author.fullName}
            secondary={comment.comment}
          />
          {hasToken && user._id === comment.author._id && (
            <Button variant='text' onClick={() => handleDelete(comment._id)}>
              삭제
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
