import { Grid, Link } from '@mui/material';

interface Props {
  onClick: () => void;
}

const SignInLinks = ({ onClick }: Props) => {
  return (
    <Grid container sx={{ marginTop: '1rem' }}>
      <Grid item xs>
        <Link variant='body2' sx={{ cursor: 'pointer' }}>
          비밀번호 또 까먹음?
        </Link>
      </Grid>
      <Grid item onClick={onClick}>
        <Link variant='body2' sx={{ cursor: 'pointer' }}>
          <span>계정도 없음?</span>
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignInLinks;
