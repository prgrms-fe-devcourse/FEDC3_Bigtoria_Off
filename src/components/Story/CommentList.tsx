import { List } from '@mui/material';

import { Comment } from '../../interfaces/comment';
import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <List>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment._id} />
      ))}
    </List>
  );
};

export default CommentList;
