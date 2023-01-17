import { API_URLS } from './../constants/apiUrls';
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

export const postProfileImage = async (formData: FormData) => {
  const { data: user } = await http.post({
    url: API_URLS.USER.UPDATE_PROFILE_IMAGE,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return user;
};

export const postCoverImage = async (formData: FormData) => {
  const { data: user } = await http.post({
    url: API_URLS.USER.UPDATE_COVER_IMAGE,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return user;
};

export const putUserInfo = async (
  fullName: string,
  year: string,
  job: string
) => {
  const { data: user } = await http.put({
    url: API_URLS.SETTING.UPDATE_MY_INFO,
    data: JSON.stringify({
      fullName,
      username: {
        year,
        job,
      },
    }),
  });

  return user;
};

export const putPassword = async (password: string) => {
  await http.put({
    url: API_URLS.SETTING.UPDATE_MY_PASSWORD,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      password,
    }),
  });
};
