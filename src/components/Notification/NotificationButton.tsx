import { Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { useNotificationsContext } from '../../contexts/NotificationContext';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

interface Props {
  onClick: () => void;
}

const NotificationButton = ({ onClick }: Props) => {
  const [invisible, setInvisible] = useState(false);
  const navigate = useNavigate();
  const { badgeCount } = useNotificationsContext();

  useEffect(() => {
    !badgeCount ? setInvisible(true) : setInvisible(false);
  }, [badgeCount]);

  const handleClick = async () => {
    const token = getLocalStorage(TOKEN_KEY);

    onClick();
    !token ? navigate(SIGNIN) : navigate(NOTIFICATION);
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Badge badgeContent={badgeCount} invisible={invisible} color='warning'>
        <Notifications onClick={handleClick} />
      </Badge>
    </Box>
  );
};

export default NotificationButton;
