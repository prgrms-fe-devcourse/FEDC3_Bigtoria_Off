import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY } from '../constants/auth';
import { getLocalStorage } from '../utils/storage';
import http from './instance';

const { NOTIFICATION } = API_URLS;

export const getNotificationList = async () => {
  const token = getLocalStorage(TOKEN_KEY);
  if (!token) return null;

  try {
    const { data: notificationList } = await http.get({
      url: NOTIFICATION.GET_NOTIFICATIONS,
    });

    return notificationList;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postNotification = async (
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'MESSAGE',
  typeId: string,
  userId: string,
  postId: string | null
) => {
  const { data: notification } = await http.post({
    url: API_URLS.NOTIFICATION.CREATE_NOTIFICATION,
    data: {
      notificationType: type,
      notificationTypeId: typeId,
      userId,
      postId,
    },
  });

  return notification;
};

export const checkNotificationSeen = async () => {
  try {
    const { data } = await http.put({
      url: NOTIFICATION.UPDATE_NOTIFICATION,
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
