import { Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

const NotificationButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    token ? navigate(NOTIFICATION) : navigate(SIGNIN);
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      {/* thinking: badgeContent={4}를 통해서 안에 숫자를 넣어주는 방향도 있다. */}
      <Badge variant='dot' color='primary'>
        <Notifications onClick={handleClick} />
      </Badge>
    </Box>
  );
};

export default NotificationButton;
