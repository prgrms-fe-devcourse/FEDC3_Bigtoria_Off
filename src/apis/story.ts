import { API_URLS } from './../constants/apiUrls';
import http from './instance';

export const getStoriesOfUser = async (userId: string) => {
  const { data: stories } = await http.get({
    url: `${API_URLS.POST.GET_POSTS_OF_SPECIFIC_USER(userId)}`,
  });

  return stories;
};

export const getStoryDetail = async (storyId: string) => {
  const { data: story } = await http.get({
    url: API_URLS.POST.GET_POST_DETAIL(storyId),
  });

  return story;
};

export const postStory = async (formData: FormData) => {
  const { data: story } = await http.post({
    url: API_URLS.POST.CREATE_POST_ON_SPECIFIC_CHANNEL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return story;
};

export const putStory = async (formData: FormData) => {
  const { data: story } = await http.put({
    url: API_URLS.POST.UPDATE_POST,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return story;
};

export const deleteStory = async (storyId: string) => {
  await http.delete({
    url: API_URLS.POST.DELETE_POST,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      id: storyId,
    }),
  });
};

export const postStoryComment = async (comment: string, storyId: string) => {
  const { data: commentData } = await http.post({
    url: API_URLS.COMMENT.CREATE_COMMENT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      comment,
      postId: storyId,
    }),
  });

  return commentData;
};

export const deleteStoryComment = async (commentId: string) => {
  await http.delete({
    url: API_URLS.COMMENT.DELETE_COMMENT,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      id: commentId,
    }),
  });
};

export const postStoryLike = async (storyId: string) => {
  const { data: like } = await http.post({
    url: API_URLS.LIKE.CREATE_LIKE,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      postId: storyId,
    }),
  });

  return like;
};

export const deleteStoryLike = async (userId: string) => {
  await http.delete({
    url: API_URLS.LIKE.DELETE_LIKE,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      id: userId,
    }),
  });
};
