import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

interface Props {
  placeholder: string;
  innerText?: string;
  type: string;
  name: string;
  errorMsg?: string;
  value: string;
  maxLength: string;
  isName?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  duplicate?: () => void;
}

const SignUpInput = ({
  placeholder,
  innerText,
  type,
  name,
  errorMsg,
  value,
  maxLength,
  isName,
  duplicate,
  onChange,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
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
        color='warning'
        onChange={onChange}
        inputProps={{ maxLength }}
        helperText={errorMsg && errorMsg}
        error={!!errorMsg}
      />
      {isName && (
        <Button
          variant='contained'
          type='button'
          color='warning'
          sx={{ position: 'absolute', right: '10px', top: '9.75px' }}
          onClick={duplicate}>
          중복확인
        </Button>
      )}
    </Box>
  );
};

export default SignUpInput;
