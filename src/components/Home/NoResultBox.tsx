import { Box, Typography } from '@mui/material';

import useDisplayModeContext from '../../contexts/DisplayModeContext';

const NoResultBox = () => {
  const { displayMode } = useDisplayModeContext();

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
          color:
            displayMode === 'dark'
              ? 'rgba(255, 255, 255, 0.5)'
              : 'rgba(0, 0, 0, 0.5)',
          fontSize: '1.5rem',
        }}>
        No Results...
      </Typography>
    </Box>
  );
};

export default NoResultBox;
