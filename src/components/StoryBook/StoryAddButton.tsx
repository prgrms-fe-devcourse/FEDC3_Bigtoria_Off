import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { checkAuth } from '../../apis/auth';
import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

const StoryAddButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);
    const { isOnline } = await checkAuth();

    token && isOnline && navigate(ROUTES.STORY_CREATE);
    (!token || !isOnline) && navigate(ROUTES.SIGNIN);
  };

  return (
    <Button variant='outlined' onClick={handleClick}>
      스토리 추가
    </Button>
  );
};

export default StoryAddButton;
