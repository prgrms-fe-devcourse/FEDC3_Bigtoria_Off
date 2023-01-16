import { Notifications } from '@mui/icons-material';
import { Badge, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  checkNotificationSeen,
  getNotificationList,
} from '../../apis/notification';
import { TOKEN_KEY } from '../../constants/auth';
import { ROUTES } from '../../constants/routes';
import { Notification } from '../../interfaces/notification';
import { getLocalStorage } from '../../utils/storage';

const { NOTIFICATION, SIGNIN } = ROUTES;

/*
 * TODO: 알림 확인하는 방법
 *  1. 주기적으로 알림 체크하기?
 */

const NotificationButton = () => {
  const [badgeCount, setBadgeCount] = useState(0);
  const [invisible, setInvisible] = useState(false);
  const token = getLocalStorage(TOKEN_KEY);
  const navigate = useNavigate();

  useEffect(() => {
    const getBadgeCount = async () => {
      if (!token) return;

      const result = await getNotificationList();

      const unSeenNotificationCount = result.filter(
        (notification: Notification) => {
          const { seen, like, follow, comment, message } = notification;

          if (!seen && (like || follow || comment || message)) return true;
          return false;
        }
      ).length;

      setBadgeCount(unSeenNotificationCount);
      unSeenNotificationCount === 0 && setInvisible(true);
    };

    getBadgeCount();
  }, [token]);

  const handleClick = async () => {
    if (!token) {
      navigate(SIGNIN);
    } else {
      //Thinking: 알림 버튼을 눌렀을 때, 일괄 확인처리할 지 아직 고려중
      // await checkNotificationSeen();
      // setInvisible(true);
      navigate(NOTIFICATION);
    }
  };

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Badge badgeContent={badgeCount} color='primary' invisible={invisible}>
        <Notifications onClick={handleClick} />
      </Badge>
    </Box>
  );
};

export default NotificationButton;
