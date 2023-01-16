import http from './instance';

export const removeFollow = async (id: string) => {
  try {
    return await http.delete({
      url: '/follow/delete',
      data: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const createFollow = async (userId: string) => {
  try {
    return await http.post({
      url: '/follow/create',
      data: {
        userId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
