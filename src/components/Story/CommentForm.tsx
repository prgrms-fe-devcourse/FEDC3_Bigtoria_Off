import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';

import { TOKEN_KEY } from '../../constants/auth';
import { getLocalStorage } from '../../utils/storage';

interface Props {
  comment: string;
  isLoading: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

const CommentForm = ({
  comment,
  isLoading,
  handleChange,
  handleSubmit,
}: Props) => {
  const hasToken = getLocalStorage(TOKEN_KEY) ? true : false;

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        color='warning'
        multiline
        rows={4}
        placeholder={
          hasToken ? '댓글을 입력해 주세요.' : '로그인 후 이용해 주세요'
        }
        value={comment}
        onChange={handleChange}
        disabled={!hasToken}></TextField>
      <Button color='warning' type='submit' disabled={!hasToken || isLoading}>
        댓글 작성
      </Button>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;
