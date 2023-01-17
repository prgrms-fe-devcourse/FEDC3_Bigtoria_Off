import { List } from '../interfaces/followList';

export const getChangedIndex = (list: List[], followId?: string) => {
  return list.findIndex((item) => item._id === followId);
};
