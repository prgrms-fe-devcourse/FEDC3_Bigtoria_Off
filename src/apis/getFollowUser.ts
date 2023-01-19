import { userInfo } from './userInfo';

export const getFollowingUser = async (followingIdList: string[]) => {
  return await Promise.all(
    followingIdList.map((followingId) => userInfo(followingId))
  );
};

export const getFollowerUser = async (followerList: string[]) => {
  return await Promise.all(
    followerList.map((followerId) => userInfo(followerId))
  );
};
