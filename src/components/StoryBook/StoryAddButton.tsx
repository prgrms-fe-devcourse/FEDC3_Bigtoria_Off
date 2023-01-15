import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

const StoryAddButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    token && navigate(ROUTES.STORY_CREATE);
    !token && navigate(ROUTES.SIGNIN);
  };

  return (
    <Button variant='outlined' onClick={handleClick}>
      스토리 쓰기
    </Button>
  );
};

export default StoryAddButton;
