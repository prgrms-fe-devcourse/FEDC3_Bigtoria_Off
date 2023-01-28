import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import useSWR from 'swr';

import { getNotificationList } from '../apis/notification';
import { TOKEN_KEY } from '../constants/auth';
import { Notification } from '../interfaces/notification';
import { getLocalStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  badgeCount: number;
  notifications: Notification[];
}

const initialState = {
  badgeCount: 0,
  notifications: [],
};

export const INTERVAL_TIME = 1000;

const NotificationsContext = createContext<State>(initialState);

export const useNotificationsContext = () => useContext(NotificationsContext);

const NotificationsProvider = ({ children }: Props) => {
  const [badgeCount, setBadgeCount] = useState(0);

  const changeBadgeCount = () => {
    const token = getLocalStorage(TOKEN_KEY);
    if (!token) {
      setBadgeCount(0);
      return;
    }

    if (!notifications) return;
    const unSeenNotificationCount = notifications.filter(
      (notification: Notification) => {
        const { seen, like, follow, comment } = notification;

        if (!seen && (like || follow || comment)) return true;
        return false;
      }
    ).length;

    setBadgeCount(unSeenNotificationCount);
  };

  const { data: notifications, isLoading } = useSWR(
    'notification',
    getNotificationList,
    {
      refreshInterval: INTERVAL_TIME,
    }
  );

  useEffect(() => {
    if (!notifications) return;

    if (!isLoading) {
      changeBadgeCount();
    }
  }, [notifications]);

  if (!notifications) return null;

  return (
    <NotificationsContext.Provider value={{ badgeCount, notifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
