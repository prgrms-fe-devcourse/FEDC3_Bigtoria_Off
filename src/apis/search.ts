import axios from 'axios';

import { User } from '../interfaces/user';

const API_END_POINT = import.meta.env.VITE_API_URL;

const API_ROUTES = {
  GET_USERS: `${API_END_POINT}/users/get-users`,
  SEARCH_USERS: `${API_END_POINT}/search/users`,
};

const { GET_USERS, SEARCH_USERS } = API_ROUTES;

export const getUserList = async () => {
  const config = {
    method: 'GET',
    url: GET_USERS,
  };

  try {
    const { data: userList } = await axios(config);

    return userList;
  } catch (error) {
    console.log(error);
    //TODO: Error message
  }
};

export const searchUserList = async (keyword: string) => {
  const config = {
    method: 'GET',
    url: `${SEARCH_USERS}/${keyword}`,
  };

  try {
    const { data: userList } = await axios(config);

    const filteredUser = userList.filter((u: User) => {
      const { fullName } = u;

      if (fullName.toLowerCase().match(keyword.toLowerCase())) return true;
      return false;
    });

    return filteredUser;
  } catch (error) {
    console.log(error);
    //TODO: Error message
  }
};
