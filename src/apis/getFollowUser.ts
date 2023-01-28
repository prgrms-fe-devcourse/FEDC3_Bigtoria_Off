import { userInfo } from './userInfo';

export const getFollowUser = (followIdList: string[]) =>
  Promise.all(followIdList.map((_id) => userInfo(_id)));
