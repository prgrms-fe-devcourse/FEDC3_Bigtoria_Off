import TextField from '@mui/material/TextField';

interface Props {
  label?: string;
  placeholder?: string;
  variant: 'outlined' | 'filled' | 'standard';
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
}

const TextInput = ({
  label,
  placeholder,
  variant,
  fullWidth = true,
  multiline = false,
  rows = 10,
  margin = 'normal',
}: Props) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      variant={variant}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      margin={margin}
    />
  );
};

export default TextInput;
