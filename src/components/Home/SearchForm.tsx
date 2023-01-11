import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, InputAdornment, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface Props {
  onSubmit: (keyword: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const keyword = value;

    if (keyword.replace(/[\s]/g, '').length) {
      onSubmit(value);
    }
    setValue('');
  };

  return (
    <Box>
      <Box
        component='form'
        sx={{
          width: '100%',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id='input-with-icon-textfield'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '100%',
          }}
          variant='outlined'
          required
          autoFocus
          type='text'
          label='user name'
          value={value}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default SearchForm;
