import { Button } from '@mui/material';

const SubmitButton = ({ loading = false, ...props }) => {
  return (
    <Button
      type='submit'
      variant='contained'
      size='large'
      fullWidth
      disabled={loading}
      {...props}
    >
      {loading ? '저장 중' : '저장'}
    </Button>
  );
};

export default SubmitButton;
