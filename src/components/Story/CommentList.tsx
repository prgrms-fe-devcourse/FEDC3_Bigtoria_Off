import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import useFetchUser from '../../hooks/useFetchUser';
import { Comment } from '../../interfaces/comment';

interface Props {
  comments: Comment[];
  handleDelete: (commentId: string) => void;
}

const CommentList = ({ comments, handleDelete }: Props) => {
  const { user } = useFetchUser();
  const navigate = useNavigate();

  return (
    <List>
      {comments.map((comment) => (
        <ListItem
          key={comment._id}
          secondaryAction={
            <IconButton edge='end' aria-label='delete'></IconButton>
          }
          sx={{ paddingRight: 0 }}>
          <ListItemAvatar
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(ROUTES.STORY_BOOK_BY_USER_ID(comment.author._id))
            }>
            <Avatar alt='profile image' src={comment.author?.image} />
          </ListItemAvatar>
          <ListItemText
            sx={{ cursor: 'pointer' }}
            primary={comment.author.fullName}
            secondary={comment.comment}
            onClick={() =>
              navigate(ROUTES.STORY_BOOK_BY_USER_ID(comment.author._id))
            }
          />
          {user._id === comment.author._id && (
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
