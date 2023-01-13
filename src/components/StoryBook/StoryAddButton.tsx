import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

const StoryAddButton = ({ onClick }: Props) => {
  return (
    <Button variant='outlined' onClick={onClick}>
      스토리 추가
    </Button>
  );
};

export default StoryAddButton;
