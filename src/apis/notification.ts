import { API_URLS } from '../constants/apiUrls';
import http from './instance';

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
