import { TOKEN_KEY } from '../constants/auth';
import { setStorage } from '../utils/storage';
import http from './instance';

interface AuthInput {
  email: string;
  password: string;
}

export const signin = async ({ email, password }: AuthInput) => {
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
  }
};
