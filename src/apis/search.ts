import { DATA_LIMIT } from '../constants/apiParams';
import { API_URLS } from '../constants/apiUrls';
import { User } from '../interfaces/user';
import { setUserListImageFirst } from '../utils/setUserListImageFirst';
import http from './instance';

const { USER, SEARCH } = API_URLS;

export const getUserList = async (offset = 0) => {
  try {
    const { data: userList } = await http.get({
      url: USER.GET_USERS,
      params: {
        limit: DATA_LIMIT,
        offset,
      },
    });

    return userList;
  } catch (error) {
    console.error(error);
  }
};

export const searchUserList = async (keyword: string) => {
  try {
    const { data: userList } = await http.get({
      url: SEARCH.GET_USERS_BY_QUERY(keyword),
    });

    const filteredFullNameMatchUsers = userList.filter((u: User) => {
      const { fullName } = u;

      if (fullName.toLowerCase().match(keyword.toLowerCase())) return true;
      return false;
    });

    const imageFirstUsers = setUserListImageFirst(filteredFullNameMatchUsers);

    return imageFirstUsers;
    // return filteredFullNameMatchUsers;
  } catch (error) {
    console.error(error);
  }
};
