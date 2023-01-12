import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

import { Comment } from '../../interfaces/comment';

interface Props {
  comments: Comment[];
  handleDelete: (commentId: string) => void;
}

const CommentList = ({ comments, handleDelete }: Props) => {
  return (
    <List>
      {comments.map((comment) => (
        <ListItem
          key={comment._id}
          secondaryAction={
            <IconButton edge='end' aria-label='delete'></IconButton>
          }
          sx={{ paddingRight: 0 }}
        >
          <ListItemAvatar>
            <Avatar alt='profile image' src={comment.author?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.author.fullName}
            secondary={comment.comment}
          />
          <Button variant='text' onClick={() => handleDelete(comment._id)}>
            삭제
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
