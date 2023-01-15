import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

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
          <Button
            disabled={isLoading}
            variant='contained'
            type='submit'
            fullWidth>
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
          }}>
          <Button
            disabled={isLoading}
            variant='outlined'
            fullWidth
            onClick={onClick}>
            로그인 없이 접속
          </Button>
          {isLoading && (
            <CircularProgress size={24} sx={{ position: 'absolute' }} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;
