import { userInfo } from './userInfo';

export const getFollowingUser = async (followingIdList: string[]) => {
  return await Promise.all(
    followingIdList.map((followingId) => userInfo(followingId))
  );
};
