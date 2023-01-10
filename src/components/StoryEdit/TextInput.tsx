import TextField from '@mui/material/TextField';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

const TextInput = ({
  placeholder,
  fullWidth = true,
  multiline = false,
  rows = 10,
}: Props) => {
  return (
    <TextField
      variant='outlined'
      placeholder={placeholder}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
    />
  );
};

export default TextInput;
