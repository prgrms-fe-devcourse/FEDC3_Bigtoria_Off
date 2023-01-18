import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import SignInButton from '../shared/SignInButton';

interface Props {
  values: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick: () => void;
}

const SignInForm = ({
  values,
  errors,
  isLoading,
  onSubmit,
  onChange,
  onClick,
}: Props) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
      <Typography component='h1' variant='h5'>
        로그인
      </Typography>
      <TextField
        error={errors.email !== ''}
        label='이메일'
        name='email'
        color='warning'
        value={values.email}
        autoFocus
        autoComplete='email'
        onChange={onChange}
        fullWidth
        helperText={errors.email && errors.email}
      />
      <TextField
        error={errors.password !== ''}
        label='비밀번호'
        name='password'
        type='password'
        color='warning'
        value={values.password}
        autoComplete='current-password'
        onChange={onChange}
        fullWidth
        helperText={errors.password && errors.password}
      />
      <Grid container sx={{ gap: '1rem' }}>
        <Grid
          item
          xs
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SignInButton disabled={isLoading}>로그인</SignInButton>
          {isLoading && (
            <CircularProgress
              color='warning'
              size={24}
              sx={{ position: 'absolute' }}
            />
          )}
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SignInButton
            disabled={isLoading}
            variant='outlined'
            type='button'
            onNavigate={onClick}>
            로그인 없이 접속
          </SignInButton>
          {isLoading && (
            <CircularProgress
              color='warning'
              size={24}
              sx={{ position: 'absolute' }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;
