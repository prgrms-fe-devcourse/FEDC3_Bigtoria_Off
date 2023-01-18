import { Button } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  onNavigate?: () => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'submit' | 'reset' | 'button';
  children: ReactNode;
}

const INIT_SIGN_IN_BUTTON_VARIANT = 'contained';
const INIT_SIGN_IN_BUTTON_TYPE = 'submit';

const SignInButton = ({
  onNavigate,
  disabled,
  variant = INIT_SIGN_IN_BUTTON_VARIANT,
  type = INIT_SIGN_IN_BUTTON_TYPE,
  children,
}: Props) => {
  return (
    <Button
      disabled={disabled && disabled}
      variant={variant}
      type={type}
      color='warning'
      onClick={onNavigate && onNavigate}
      fullWidth>
      {children}
    </Button>
  );
};

export default SignInButton;
