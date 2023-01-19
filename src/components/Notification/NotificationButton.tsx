import { Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getNotificationList } from '../../apis/notification';
import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { Notification } from '../../interfaces/notification';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

interface Props {
  onClick: () => void;
}

const NotificationButton = ({ onClick }: Props) => {
  const [badgeCount, setBadgeCount] = useState(0);
  const [invisible, setInvisible] = useState(false);
  const navigate = useNavigate();

  const getBadgeCount = async () => {
    const token = getLocalStorage(TOKEN_KEY);
    if (!token) {
      setBadgeCount(0);
      setInvisible(true);
      return;
    }

    const result = await getNotificationList();

    const unSeenNotificationCount = result?.filter(
      (notification: Notification) => {
        const { seen, like, follow, comment, message } = notification;

        if (!seen && (like || follow || comment || message)) return true;
        return false;
      }
    ).length;

    setBadgeCount(unSeenNotificationCount || 0);
    unSeenNotificationCount === 0 ? setInvisible(true) : setInvisible(false);
  };

  useSWR(`badgeNotification`, getBadgeCount, {
    refreshInterval: 1000,
  });

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
