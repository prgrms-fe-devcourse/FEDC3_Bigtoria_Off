import { isAxiosError } from 'axios';

import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY } from '../constants/auth';
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
      data: { token },
    } = await http.post({
      url: API_URLS.AUTH.LOGIN,
      data: {
        email,
        password,
      },
    });

    token && setLocalStorage(TOKEN_KEY, token);
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
      location.href = ROUTES.HOME;
    }
  } catch (error) {
    console.error(error);
  }
};
