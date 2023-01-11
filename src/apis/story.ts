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

export const postStoryComment = async (comment: string, storyId: string) => {
  const { data: commentData } = await http.post({
    headers: {
      'Content-Type': 'application/json',
    },
    url: API_URLS.COMMENT.CREATE_COMMENT,
    data: JSON.stringify({
      comment,
      postId: storyId,
    }),
  });
  console.log(commentData);
};

export const deleteStoryComment = async (commentId: string) => {
  await http.delete({
    headers: {
      'Content-Type': 'application/json',
    },
    url: API_URLS.COMMENT.DELETE_COMMENT,
    data: JSON.stringify({
      id: commentId,
    }),
  });
};
