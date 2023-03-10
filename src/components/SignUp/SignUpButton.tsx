import { Box, Button, CircularProgress } from '@mui/material';

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
        }}>
        <Button
          fullWidth={true}
          variant='contained'
          type='submit'
          color='warning'
          disabled={isLoading}>
          회원가입
        </Button>
        {isLoading && (
          <CircularProgress
            color='warning'
            size={24}
            sx={{
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
