import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  checkNotificationSeen,
  getNotificationList,
} from '../apis/notification';
import NotificationList from '../components/Notification/NotificationList';
import TabContainer from '../components/Notification/TabContainer';
import { ROUTES } from '../constants/routes';
import { useNotificationsContext } from '../contexts/NotificationContext';
import { Notification as NotificationType } from '../interfaces/notification';

const { SIGNIN } = ROUTES;

const MAIN_TAB_VALUE = 'message';
const CHECK_ALL_NOTIFICATION = '전체 읽음';

const Notification = () => {
  const [tabValue, setTabValue] = useState(MAIN_TAB_VALUE);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const navigate = useNavigate();

  const { notifications: notificationsFromContext } = useNotificationsContext();

  const setNotificationsOrRedirection = async () => {
    const result = await getNotificationList();

    result ? setNotifications(result) : navigate(SIGNIN);
  };

  const handleCheckNotificationBtnClick = async () => {
    await checkNotificationSeen();
    await setNotificationsOrRedirection();
  };

  useEffect(() => {
    notificationsFromContext && setNotifications(notificationsFromContext);
  }, [notificationsFromContext]);

  useEffect(() => {
    const getNotifications = async () => {
      await setNotificationsOrRedirection();
    };

    getNotifications();
  }, [tabValue]);

  return (
    <Box
      sx={{
        minWidth: '320px',
        maxWidth: '412px',
        margin: '2rem auto 0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        component='main'
        sx={{
          width: '92%',
          display: 'block',
          margin: '0 auto',
        }}>
        <Box
          component='section'
          sx={{
            marginBottom: '25px',
          }}>
          <TabContainer
            onClick={(type) => {
              setTabValue(type);
            }}
          />
        </Box>
        <Box component='section'>
          <Button color='warning' onClick={handleCheckNotificationBtnClick}>
            {CHECK_ALL_NOTIFICATION}
          </Button>
          <NotificationList type={tabValue} notifications={notifications} />
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
