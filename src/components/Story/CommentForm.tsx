import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

import { useCommentForm } from '../../hooks/useComment';

const CommentForm = () => {
  const { comment, isLoading, handleChange, handleSubmit } = useCommentForm();

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder='댓글을 입력해 주세요.'
        value={comment}
        onChange={handleChange}
        required
      ></TextField>
      <Button type='submit' disabled={isLoading}>
        등록
      </Button>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
`;
