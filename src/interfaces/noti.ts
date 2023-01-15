import { Comment } from './comment';
import { Like } from './like';
import { Message } from './message';
import { Follow, User } from './user';

export interface Notification {
  _id: string;
  author: User;
  posts?: string;
  like?: Like;
  comment?: Comment;
  follow?: Follow;
  message?: Message;
  seen: boolean;
  createdAt?: string;
  updatedAt?: string;
}
