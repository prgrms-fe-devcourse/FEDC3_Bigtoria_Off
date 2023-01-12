import { Grid, Link } from '@mui/material';

interface Props {
  onClick: () => void;
}

const SignInLinks = ({ onClick }: Props) => {
  return (
    <Grid container sx={{ marginTop: '1rem' }}>
      <Grid item xs>
        <Link variant='body2' sx={{ cursor: 'pointer' }}>
          비밀번호를 잊으셨나요?
        </Link>
      </Grid>
      <Grid item onClick={onClick}>
        <Link variant='body2' sx={{ cursor: 'pointer' }}>
          <span>아직 계정이 없으신가요?</span>
          <span> 회원가입</span>
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignInLinks;
