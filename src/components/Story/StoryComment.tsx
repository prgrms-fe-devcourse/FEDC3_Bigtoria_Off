import { Box } from '@mui/material';

import { useCommentForm } from '../../hooks/useComment';
import { Comment } from '../../interfaces/comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface Props {
  storyAuthorId: string;
  comments: Comment[];
  fetchComment: () => void;
}

const StoryComment = ({ storyAuthorId, comments, fetchComment }: Props) => {
  const { comment, isLoading, handleChange, handleDelete, handleSubmit } =
    useCommentForm(storyAuthorId);

  return (
    <Box>
      <CommentList
        comments={comments}
        handleDelete={async (comment) => {
          await handleDelete(comment);
          fetchComment();
        }}
      />
      <CommentForm
        comment={comment}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={async (e) => {
          await handleSubmit(e);
          fetchComment();
        }}
      />
    </Box>
  );
};

export default StoryComment;
