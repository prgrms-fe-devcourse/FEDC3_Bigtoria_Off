import http from './instance';

export const removeFollow = async (id: string) => {
  try {
    await http.delete({
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
    await http.post({
      url: '/follow/create',
      data: {
        userId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
