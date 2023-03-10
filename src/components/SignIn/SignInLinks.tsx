import { Container, Link } from '@mui/material';

import { COLORS } from '../../constants/colors';

interface Props {
  onClick: () => void;
}

const SignInLinks = ({ onClick }: Props) => {
  return (
    <Container
      sx={{ textAlign: 'center', marginTop: '1rem' }}
      onClick={onClick}>
      <Link
        variant='body2'
        sx={{
          cursor: 'pointer',
          color: COLORS.MUI_WARNING,
          textDecorationColor: COLORS.MUI_WARNING,
        }}>
        <span>아직도 계정 없음?</span>
      </Link>
    </Container>
  );
};

export default SignInLinks;
