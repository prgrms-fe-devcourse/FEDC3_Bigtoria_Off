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
  let isSignInFailed = false;
  let errorMessage = '';

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
    if (error && axios.isAxiosError(error)) {
      isSignInFailed = true;
      errorMessage = error.response?.data;
    }
    console.error(error);
  }

  return { isSignInFailed, errorMessage };
};
