import axios from 'axios';

import { TOKEN_KEY } from '../constants/auth';
import { setStorage } from '../utils/storage';
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
      url: '/login',
      data: {
        email,
        password,
      },
    });

    token && setStorage(TOKEN_KEY, token);
  } catch (error) {
    console.error(error);
    if (error && axios.isAxiosError(error)) {
      return { isSignInFailed: true, errorMessage: error.response?.data };
    }
  }

  return { isSignInFailed: false, errorMessage: '' };
};
