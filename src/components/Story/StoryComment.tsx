import { Box } from '@mui/material';

import { useCommentForm, useDeleteComment } from '../../hooks/useComment';
import { Comment } from '../../interfaces/comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface Props {
  comments: Comment[];
  fetchComment: () => void;
}

const StoryComment = ({ comments, fetchComment }: Props) => {
  const { comment, isLoading, handleChange, handleSubmit } = useCommentForm();
  const { handleDelete } = useDeleteComment();

  return (
    <Box>
      <CommentList
        comments={comments}
        handleDelete={async (comment) => {
          await handleDelete(comment);
          await fetchComment();
        }}
      />
      <CommentForm
        comment={comment}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={async (e) => {
          await handleSubmit(e);
          await fetchComment();
        }}
      />
    </Box>
  );
};

export default StoryComment;
