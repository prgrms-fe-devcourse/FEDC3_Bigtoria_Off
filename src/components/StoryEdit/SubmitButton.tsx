import { Button } from '@mui/material';

interface Props {
  isLoading: boolean;
}

const SubmitButton = ({ isLoading = false }: Props) => {
  return (
    <Button
      color='warning'
      type='submit'
      variant='contained'
      size='large'
      fullWidth
      disabled={isLoading}>
      {isLoading ? '저장 중' : '저장'}
    </Button>
  );
};

export default SubmitButton;
