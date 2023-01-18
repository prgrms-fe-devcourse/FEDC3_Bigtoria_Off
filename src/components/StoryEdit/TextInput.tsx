import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  label?: string;
  multiline?: boolean;
  rows?: number;
  name: string;
  value: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  multiline = false,
  rows,
  name,
  value,
  error,
  onChange,
}: Props) => {
  return (
    <TextField
      fullWidth
      color='warning'
      variant='outlined'
      label={label}
      multiline={multiline}
      rows={rows}
      name={name}
      value={value}
      error={error}
      onChange={onChange}
    />
  );
};

export default TextInput;
