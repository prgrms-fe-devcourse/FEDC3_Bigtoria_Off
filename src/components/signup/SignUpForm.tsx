import SignUpButton from './SignUpButton';
import SignUpInput from './SignUpInput';
import { Container, Box } from '@mui/material';
import useForm from '../../hooks/useForm';
import SignUpSelector from './SignUpSelector';

type SignUpOption = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birth: string;
  career: string;
};

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
  } = useForm<SignUpOption>({
    onSubmit: async (values: SignUpOption) => {
      console.log('submit');
    },
  });

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SignUpInput
          placeholder='닉네임'
          type='text'
          name='fullName'
          onChange={handleChange}
          errorMsg={fullNameError}
        />
        <SignUpInput
          placeholder='이메일 주소'
          type='text'
          name='email'
          onChange={handleChange}
          errorMsg={emailError}
        />
        <SignUpInput
          placeholder='비밀번호'
          type='password'
          name='password'
          onChange={handleChange}
          errorMsg={passwordError}
        />
        <SignUpInput
          placeholder='비밀번호 확인'
          type='password'
          name='passwordConfirm'
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
