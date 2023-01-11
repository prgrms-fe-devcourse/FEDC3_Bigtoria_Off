import Error from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';

const NoResultBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Error
        sx={{
          width: '100px',
          height: '100px',
          marginBottom: '20px',
          color: 'rgba(0, 0, 0, 0.5)',
        }}
      />
      <Typography
        component='h1'
        sx={{
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: '1.5rem',
        }}
      >
        No Results...
      </Typography>
    </Box>
  );
};

export default NoResultBox;
