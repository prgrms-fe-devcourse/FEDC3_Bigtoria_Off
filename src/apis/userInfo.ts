import http from './instance';

export const userInfo = async (userId: string) => {
  const { data } = await http.get({
    url: `/users/${userId}`,
  });

  return data;
};
