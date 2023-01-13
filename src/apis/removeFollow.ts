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
