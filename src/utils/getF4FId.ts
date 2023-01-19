export const getF4FId = (f4f: string[][]) => {
  const followerId = f4f[0];
  const myFollowingId = f4f[1];
  return followerId.filter((item: string) => myFollowingId.includes(item));
};
