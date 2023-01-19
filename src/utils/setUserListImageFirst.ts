import { User } from '../interfaces/user';

export const setUserListImageFirst = (users: User[]) => {
  const imageUsers = users.filter((user: User) => user.image);
  const notHaveImageUsers = users.filter((user: User) => !user.image);

  const reArrangedUsersList = [...imageUsers, ...notHaveImageUsers];

  return reArrangedUsersList;
};
