import { Box, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

/*
 * TODO
 * 1. Component styling
 */

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

    onSubmit(value);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextField
        required
        autoFocus
        type='text'
        label='user name'
        onChange={handleChange}
      />
    </Box>
  );
};

export default SearchForm;
