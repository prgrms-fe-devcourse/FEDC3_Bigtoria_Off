import { Box, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface Props {
  placeholder: string;
  innerText?: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SignUpInput = ({
  placeholder,
  innerText,
  type,
  name,
  errorMsg,
  value,
  onChange,
}: Props) => {
  return (
    <Box
      sx={{
        alignItems: 'center',
        position: 'relative',
        paddingBottom: '15px',
      }}>
      <TextField
        fullWidth
        label={placeholder}
        placeholder={innerText}
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
