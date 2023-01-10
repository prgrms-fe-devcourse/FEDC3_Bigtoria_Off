import http from './instance';

export const getStoriesOfUser = async (userId: string) => {
  const { data: stories } = await http.get({
    url: `/posts/author/${userId}`,
  });

  return stories;
};
