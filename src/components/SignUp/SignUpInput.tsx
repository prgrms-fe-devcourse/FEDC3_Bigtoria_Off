import { Box, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface Props {
  placeholder: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SignUpInput = ({
  placeholder,
  type,
  name,
  errorMsg,
  value,
  onChange,
}: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: '15px',
      }}>
      <TextField
        fullWidth
        label={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        helperText={errorMsg && errorMsg}
        error={!!errorMsg}
      />
    </Box>
  );
};

export default SignUpInput;
