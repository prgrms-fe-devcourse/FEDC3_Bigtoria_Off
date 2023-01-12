import { Container, Divider, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SignInForm from '../components/SignIn/SignInForm';
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
    <>
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
        <Grid container sx={{ marginTop: '1rem' }}>
          <Grid item xs>
            <Link variant='body2' sx={{ cursor: 'pointer' }}>
              비밀번호를 잊으셨나요?
            </Link>
          </Grid>
          <Grid item onClick={handleClickButtonToSignUp}>
            <Link variant='body2' sx={{ cursor: 'pointer' }}>
              <span>아직 계정이 없으신가요?</span>
              <span> 회원가입</span>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignIn;
