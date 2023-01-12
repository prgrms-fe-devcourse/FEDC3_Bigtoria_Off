import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, FormEvent } from 'react';

import { TOKEN_KEY } from '../../apis/instance';
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
  const isLogin = getLocalStorage(TOKEN_KEY) ? true : false;

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder={
          isLogin ? '댓글을 입력해 주세요.' : '로그인 후 이용해 주세요'
        }
        value={comment}
        onChange={handleChange}
        required
        disabled={!isLogin}
      ></TextField>
      <Button type='submit' disabled={!isLogin || isLoading}>
        등록
      </Button>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
`;
