import SignUpButton from './SignUpButton';
import SignUpInput from './SignUpInput';
import { Container } from '@mui/material';
import { FormEvent } from 'react';
import styled from '@emotion/styled';

const SignUpForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <SignUpInput placeholder="아이디" />
        <SignUpInput placeholder="비밀번호" />
        <SignUpInput placeholder="비밀번호 확인" />
        <SignUpInput placeholder="출생연도" />
        <SignUpInput placeholder="직업" />
        <SignUpButton />
      </StyledForm>
    </Container>
  );
};

export default SignUpForm;

const StyledForm = styled.form``;
