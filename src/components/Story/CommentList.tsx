import styled from '@emotion/styled';
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
  const { user, isLoading } = useFetchUser();
  const navigate = useNavigate();

  return (
    <List sx={{ padding: '20px 0' }}>
      {comments.map((comment) => (
        <ListItem
          key={comment._id}
          secondaryAction={
            <IconButton edge='end' aria-label='delete'></IconButton>
          }
          sx={{ padding: '15px 0', alignItems: 'flex-start' }}>
          <ListItemAvatar
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(ROUTES.STORY_BOOK_BY_USER_ID(comment.author._id))
            }>
            <Avatar alt='profile image' src={comment.author?.image} />
          </ListItemAvatar>
          <ListItemText>
            <NameWrapper
              onClick={() =>
                navigate(ROUTES.STORY_BOOK_BY_USER_ID(comment.author._id))
              }>
              {comment.author.fullName}
            </NameWrapper>
            <ContentWrapper>{comment.comment}</ContentWrapper>
          </ListItemText>
          {!isLoading && user && user._id === comment.author._id && (
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

const NameWrapper = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  white-space: pre-wrap;
`;
