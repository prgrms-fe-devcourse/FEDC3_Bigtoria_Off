import { Box, Typography } from '@mui/material';

const NoResultBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}>
      <Typography
        component='h1'
        sx={{
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: '1.5rem',
        }}>
        No Results...
      </Typography>
    </Box>
  );
};

export default NoResultBox;
