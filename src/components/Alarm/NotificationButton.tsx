import { Notifications } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

const AlarmButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    token ? navigate(NOTIFICATION) : navigate(SIGNIN);
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Notifications onClick={handleClick} />
    </Box>
  );
};

export default AlarmButton;
