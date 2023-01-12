import axios from 'axios';

import { API_URLS } from '../constants/apiUrls';
import { TOKEN_KEY } from '../constants/auth';
import { setLocalStorage } from '../utils/storage';
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
    if (error && axios.isAxiosError(error)) {
      return { isSignInFailed: true, errorMessage: error.response?.data };
    }
  }

  return { isSignInFailed: false, errorMessage: '' };
};
