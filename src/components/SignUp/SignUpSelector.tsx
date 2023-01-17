import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ReactNode } from 'react';

import DatePicker from '../StoryEdit/DatePicker';

interface Props {
  name: string;
  errorMsg?: string;
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}

const SignUpSelector = ({ name, errorMsg, onChange }: Props) => {
  const getFullYear = () => {
    return Array(new Date().getFullYear() - 1980)
      .fill(0)
      .map((_, i) => new Date().getFullYear() - i);
  };

  return (
    <Box
      sx={{
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingBottom: '15px',
      }}>
      <FormControl fullWidth>
        <InputLabel id='select-label'>Age</InputLabel>
        <Select
          error={!!errorMsg}
          labelId='select-label'
          name={name}
          onChange={onChange}
          label='age'
          defaultValue=''
          fullWidth>
          <MenuItem disabled value='' sx={{ display: 'none' }}></MenuItem>
          {getFullYear().map((item) => (
            <MenuItem key={item} value={`${item}`}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {errorMsg && (
        <FormHelperText error={!!errorMsg}>{errorMsg}</FormHelperText>
      )}
    </Box>
  );
};

export default SignUpSelector;
