import { API_URLS } from './../constants/apiUrls';
import http from './instance';

export const getStoriesOfUser = async (userId: string) => {
  const { data: stories } = await http.get({
    url: `/posts/author/${userId}`,
  });

  return stories;
};

export const getStoryDetail = async (storyId: string) => {
  const { data: story } = await http.get({
    url: API_URLS.POST.GET_POST_DETAIL(storyId),
  });

  return story;
};
