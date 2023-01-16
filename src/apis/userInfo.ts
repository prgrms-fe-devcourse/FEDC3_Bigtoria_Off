import { API_URLS } from './../constants/apiUrls';
import http from './instance';

export const userInfo = async (userId: string) => {
  try {
    const { data } = await http.get({
      url: API_URLS.USER.GET_USER_INFO(userId),
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
