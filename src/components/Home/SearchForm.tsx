import { HighlightOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';

import useSearhForm from '../../hooks/useSearchForm';

interface Props {
  onSubmit: (keyword: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const { value, handleInputChange, handleInputClear, handleFormSubmit } =
    useSearhForm({ onSubmit });

  return (
    <Box>
      <Box
        component='form'
        sx={{
          width: '100%',
          position: 'relative',
          marginBottom: '10px',
        }}
        onSubmit={handleFormSubmit}>
        <TextField
          sx={{
            width: '100%',
            '& input': {
              height: '50px',
              borderBottom: '2px solid black',
              paddingLeft: '11px',
            },
            //TODO: input focus boder-bottom #f99b0f
          }}
          variant='standard'
          required
          autoFocus
          type='text'
          label='user name'
          value={value}
          onChange={handleInputChange}
        />
        <IconButton
          color='primary'
          component='label'
          sx={{
            position: 'absolute',
            right: '2px',
            top: '30px',
            color: '#167fe7',
          }}
          onClick={handleInputClear}>
          <HighlightOff />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchForm;
