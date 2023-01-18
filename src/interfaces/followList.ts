export interface List {
  _id: string;
  user: string;
  follower?: string;
  fullName?: string;
  image?: string;
  coverImage?: string;
  username?: string;
  isOnline?: boolean;
}

export interface FollowerList {
  _id: string;
  follower: string;
  fullName?: string;
  image?: string;
  isOnline?: boolean;
}
