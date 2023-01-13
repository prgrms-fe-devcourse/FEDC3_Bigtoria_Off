import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const CommentForm = () => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Form>
      <TextField
        fullWidth
        placeholder='댓글을 입력해 주세요.'
        value={text}
        onChange={handleChange}></TextField>
      <Button type='submit'>확인</Button>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  display: flex;
`;
