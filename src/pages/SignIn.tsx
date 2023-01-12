import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { color } from '../constants/color';
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
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Typography component='h1' variant='h5'>
            로그인
          </Typography>
          <TextField
            error={errors.email !== ''}
            label='이메일'
            name='email'
            value={values.email}
            autoFocus
            autoComplete='email'
            onChange={handleChange}
            fullWidth
          />
          {errors.email && <Text>{errors.email}</Text>}
          <TextField
            error={errors.password !== ''}
            label='비밀번호'
            name='password'
            type='password'
            value={values.password}
            autoComplete='current-password'
            onChange={handleChange}
            fullWidth
          />
          {errors.password && <Text>{errors.password}</Text>}
          <Grid container sx={{ gap: '1rem' }}>
            <Grid
              item
              xs
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                disabled={isLoading}
                variant='contained'
                type='submit'
                fullWidth
              >
                로그인
              </Button>
              {isLoading && (
                <CircularProgress size={24} sx={{ position: 'absolute' }} />
              )}
            </Grid>
            <Grid
              item
              xs
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                disabled={isLoading}
                variant='outlined'
                fullWidth
                onClick={handleClickButtonWithoutSignIn}
              >
                로그인 없이 접속
              </Button>
              {isLoading && (
                <CircularProgress size={24} sx={{ position: 'absolute' }} />
              )}
            </Grid>
          </Grid>
        </Box>
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

const Text = styled.div`
  color: ${color.error};
  align-self: start;
`;
