import { API_URLS } from '../constants/apiUrls';
import http from './instance';

const { NOTIFICATION } = API_URLS;

export const getNotificationList = async () => {
  try {
    const { data: notificationList } = await http.get({
      url: NOTIFICATION.GET_NOTIFICATIONS,
    });

    return notificationList;
  } catch (error) {
    //Thinking: console.error 보여줘야 하는가?
    // console.error(error);
    return null;
  }
};
