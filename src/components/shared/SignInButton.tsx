import { Button } from '@mui/material';

interface Props {
  onNavigate?: () => void;
  disabled: boolean;
  type?: 'contained' | 'outlined' | 'text';
}

const INIT_SIGN_IN_BUTTON_TYPE = 'contained';

const SignInButton = ({
  onNavigate,
  disabled,
  type = INIT_SIGN_IN_BUTTON_TYPE,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      variant={type}
      type='submit'
      onClick={onNavigate && onNavigate}
      fullWidth>
      로그인
    </Button>
  );
};

export default SignInButton;
