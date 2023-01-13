import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

const StoryAddButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.STORY_CREATE);
  };

  return (
    <Button variant='outlined' onClick={handleClick}>
      스토리 추가
    </Button>
  );
};

export default StoryAddButton;
