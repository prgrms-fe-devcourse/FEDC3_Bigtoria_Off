import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';
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
        placeholder={
          hasToken ? '댓글을 입력해 주세요.' : '로그인 후 이용해 주세요'
        }
        value={comment}
        onChange={handleChange}
        disabled={!hasToken}></TextField>
      <IconButton
        type='submit'
        color='warning'
        aria-label='comment-submit'
        disabled={!hasToken || isLoading}>
        <SendIcon />
      </IconButton>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;
`;
