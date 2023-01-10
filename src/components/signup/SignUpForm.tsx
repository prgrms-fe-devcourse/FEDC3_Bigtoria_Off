import { Box, Container } from '@mui/material';
import { FormEvent } from 'react';

import SignUpButton from './SignUpButton';
import SignUpInput from './SignUpInput';

const SignUpForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SignUpInput placeholder='닉네임' type='text' />
        <SignUpInput placeholder='아이디' type='text' />
        <SignUpInput placeholder='비밀번호' type='password' />
        <SignUpInput placeholder='비밀번호 확인' type='password' />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SignUpInput placeholder='출생연도' type='text' />
          <SignUpInput placeholder='직업' type='text' />
        </Box>
        <SignUpButton />
      </form>
    </Container>
  );
};

export default SignUpForm;
