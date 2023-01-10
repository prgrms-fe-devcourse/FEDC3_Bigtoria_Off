import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  placeholder,
  multiline = false,
  rows = 10,
  name,
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
      onChange={onChange}
    />
  );
};

export default TextInput;
