import { isAxiosError } from 'axios';

import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY, USER_ID_KEY } from '../constants/auth';
import { HTTP_STATUS_CODE } from '../constants/http';
import { ROUTES } from '../constants/routes';
import { removeLocalStorage, setLocalStorage } from '../utils/storage';
import http from './instance';

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const {
      data: {
        token,
        user: { _id: userId },
      },
    } = await http.post({
      url: API_URLS.AUTH.LOGIN,
      data: {
        email,
        password,
      },
    });

    token && setLocalStorage(TOKEN_KEY, token);
    userId && setLocalStorage(USER_ID_KEY, userId);
  } catch (error) {
    console.error(error);
    if (error && isAxiosError(error)) {
      return { isSignInFailed: true, errorMessage: error.response?.data };
    }
  }

  return { isSignInFailed: false, errorMessage: '' };
};

export const signout = async () => {
  try {
    const { status } = await http.post({
      url: API_URLS.AUTH.LOGOUT,
    });

    if (status === HTTP_STATUS_CODE.OK) {
      removeLocalStorage(TOKEN_KEY);
      removeLocalStorage(USER_ID_KEY);
      location.href = ROUTES.HOME;
    }
  } catch (error) {
    console.error(error);
  }
};

export const checkAuth = async () => {
  const { data: user } = await http.get({
    url: API_URLS.AUTH.CHECK_AUTH,
  });

  return user;
};
