import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  placeholder,
  multiline = false,
  rows = 10,
  name,
  value,
  onChange,
}: Props) => {
  return (
    <TextField
      fullWidth
      variant='outlined'
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
