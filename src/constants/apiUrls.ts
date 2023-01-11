export const API_URLS = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    SIGNUP: '/signup',
    CHECK_AUTH: '/auth-user',
  },
  USER: {
    GET_USERS: '/users/get-users',
    GET_CURRENT_CONNECTED_USERS: '/users/online-users',
    GET_USER_INFO: (userId: string) => `/users/${userId}`,
    UPDATE_PROFILE_IMAGE: '/users/upload-photo',
    UPDATE_COVER_IMAGE: '/users/upload-photo',
  },
  SETTING: {
    UPDATE_MY_INFO: '/settings/update-user',
    UPDATE_MY_PASSWORD: '/settings/update-password',
  },
  CHANNEL: {
    GET_CHANNELS: '/channels',
    GET_CHANNEL_INFO: (channelName: string) => `/channel/${channelName}`,
  },
  POST: {
    GET_POSTS_OF_SPECIFIC_CHANNEL: (channelId: string) =>
      `/posts/channel/${channelId}`,
    GET_POSTS_OF_SPECIFIC_USER: (authorId: string) =>
      `/posts/author/${authorId}`,
    CREATE_POST_ON_SPECIFIC_CHANNEL: '/posts/create',
    GET_POST_DETAIL: (postId: string) => `/posts/${postId}`,
    UPDATE_POST: '/posts/update',
    DELETE_POST: '/posts/delete',
  },
  LIKE: {
    CREATE_LIKE: '/likes/create',
    DELETE_LIKE: '/likes/delete',
  },
  COMMENT: {
    CREATE_COMMENT: '/comments/create',
    DELETE_COMMENT: '/comments/delete',
  },
  NOTIFICATION: {
    GET_NOTIFICATIONS: '/notifications',
    UPDATE_NOTIFICATION: '/notifications/seen',
    CREATE_NOTIFICATION: '/notifications/create',
  },
  FOLLOW: {
    CREATE_FOLLOW: '/follow/create',
    DELETE_FOLLOW: '/follow/delete',
  },
  MESSAGE: {
    GET_MY_MESSAGES: '/messages/conversations',
    GET_MESSAGES_WITH_SPECIFIC_USER: '/messages',
    CREATE_MESSAGE: '/messages/create',
    UPDATE_MESSAGE: '/messages/update-seen',
  },
  SEARCH: {
    GET_USERS_BY_QUERY: (query: string) => `/search/users/${query}`,
    GET_RESULTS_BY_QUERY: (query: string) => `/search/all/${query}`,
  },
};
