import { Box, Container } from '@mui/material';

import useSignUpForm from '../../hooks/useSignUpForm';
import SignUpButton from './SignUpButton';
import SignUpInput from './SignUpInput';
import SignUpSelector from './SignUpSelector';

const SignUpForm = () => {
  const {
    values,
    isLoading,
    fullNameError,
    emailError,
    passwordError,
    passwordConfirmError,
    birthError,
    careerError,
    handleSubmit,
    handleChange,
  } = useSignUpForm();

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SignUpInput
          placeholder='닉네임'
          type='text'
          name='fullName'
          value={values.fullName}
          onChange={handleChange}
          errorMsg={fullNameError}
        />
        <SignUpInput
          placeholder='이메일 주소'
          type='text'
          name='email'
          value={values.email}
          onChange={handleChange}
          errorMsg={emailError}
        />
        <SignUpInput
          placeholder='비밀번호'
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          errorMsg={passwordError}
        />
        <SignUpInput
          placeholder='비밀번호 확인'
          type='password'
          name='passwordConfirm'
          value={values.passwordConfirm}
          onChange={handleChange}
          errorMsg={passwordConfirmError}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SignUpSelector
            onChange={handleChange}
            name='birth'
            errorMsg={birthError}
          />
          <SignUpInput
            placeholder='직업'
            type='text'
            name='career'
            value={values.career}
            onChange={handleChange}
            errorMsg={careerError}
          />
        </Box>
        <SignUpButton isLoading={isLoading} />
      </form>
    </Container>
  );
};

export default SignUpForm;
