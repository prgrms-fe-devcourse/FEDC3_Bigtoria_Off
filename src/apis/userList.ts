import { API_URLS } from './../constants/apiUrls';
import http from './instance';

export const userList = async () => {
  try {
    const { data } = await http.get({
      url: API_URLS.USER.GET_USERS,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
