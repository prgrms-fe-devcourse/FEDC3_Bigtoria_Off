import { Box, Button, CircularProgress } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

interface Props {
  isLoading: boolean;
}

const SignUpButton = ({ isLoading }: Props) => {
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
          type='submit'
          disabled={isLoading}
        >
          회원가입
        </Button>
        {isLoading && (
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
