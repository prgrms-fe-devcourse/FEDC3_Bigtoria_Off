import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';

interface Props {
  comment: string;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  hasToken: boolean;
}

const CommentForm = ({
  comment,
  isLoading,
  handleChange,
  handleSubmit,
  hasToken,
}: Props) => {
  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder={
          hasToken ? '댓글을 입력해 주세요.' : '로그인 후 이용해 주세요'
        }
        value={comment}
        onChange={handleChange}
        required
        disabled={!hasToken}
      ></TextField>
      <Button type='submit' disabled={!hasToken || isLoading}>
        등록
      </Button>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
`;
