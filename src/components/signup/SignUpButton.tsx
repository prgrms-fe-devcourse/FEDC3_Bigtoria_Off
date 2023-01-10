import { Box, Button, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { useState } from 'react';

const SignUpButton = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Button
          fullWidth={true}
          variant='contained'
          disabled={loading}
          onClick={handleButtonClick}
        >
          회원가입
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: lightBlue[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default SignUpButton;
