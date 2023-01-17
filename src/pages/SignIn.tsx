import { Container, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignInForm from '../components/SignIn/SignInForm';
import SignInLinks from '../components/SignIn/SignInLinks';
import { ROUTES } from '../constants/routes';
import useCheckAuthToken from '../hooks/useCheckAuthToken';
import useSignInForm from '../hooks/useSignInForm';

const SignIn = () => {
  useCheckAuthToken();
  const navigate = useNavigate();
  const { values, errors, isLoading, handleChange, handleSubmit } =
    useSignInForm({
      email: '',
      password: '',
    });

  const handleClickButtonWithoutSignIn = () => {
    navigate(ROUTES.HOME);
  };

  const handleClickButtonToSignUp = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ padding: '1rem' }}>
      <SignInForm
        values={values}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClick={handleClickButtonWithoutSignIn}
      />
      <Divider
        sx={{
          marginTop: '1rem',
        }}
      />
      <SignInLinks onClick={handleClickButtonToSignUp} />
    </Container>
  );
};

export default SignIn;
