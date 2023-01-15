import { useEffect, useState } from 'react';

import { getUserList, searchUserList } from '../apis/search';
import { User } from '../interfaces/user';

const useFetchUserList = () => {
  const [userProfiles, setUserProfiles] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initUserProfiles = async () => {
    setIsLoading(true);

    const userList = await getUserList(0);

    setUserProfiles(userList);
    console.log(userList);

    setIsLoading(false);
  };

  const searchUserProfiles = async (keyword: string) => {
    setIsLoading(true);

    const filteredUser = await searchUserList(keyword);

    setUserProfiles(filteredUser);

    setIsLoading(false);
  };

  return {
    isLoading,
    userProfiles,
    setUserProfiles,
    initUserProfiles,
    searchUserProfiles,
  };
};

export default useFetchUserList;
