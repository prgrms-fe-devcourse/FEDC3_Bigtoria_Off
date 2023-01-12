import http from './instance';

export const userInfo = async (userId: string) => {
  try {
    const { data } = await http.get({
      url: `/users/${userId}`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
