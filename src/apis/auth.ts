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

    // token && setLocal
  } catch (error) {
    console.error(error);
  }
};
