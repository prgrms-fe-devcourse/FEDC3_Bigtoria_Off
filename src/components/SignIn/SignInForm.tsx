import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
} from '@mui/material';

const SignInForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
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
        <TextField
          label='이메일'
          name='email'
          autoFocus
          autoComplete='email'
          required
          fullWidth
        />
        <TextField
          label='비밀번호'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          fullWidth
        />
        <Grid container sx={{ gap: '1rem' }}>
          <Grid item xs>
            <Button variant='contained' type='submit' fullWidth>
              로그인
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant='outlined' fullWidth>
              로그인 없이 접속
            </Button>
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
        <Grid item>
          <Link variant='body2' sx={{ cursor: 'pointer' }}>
            <span>아직 계정이 없으신가요?</span>
            <span> 회원가입</span>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInForm;
