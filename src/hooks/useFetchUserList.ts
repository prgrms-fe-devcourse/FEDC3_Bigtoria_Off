import { useState } from 'react';

import { getUserList, searchUserList } from '../apis/search';

const useFetchUserList = () => {
  const [userProfiles, setUserProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initUserProfiles = async () => {
    setIsLoading(true);

    const userList = await getUserList();

    setUserProfiles(userList);

    setIsLoading(false);
  };

  const searchUserProfiles = async (keyword: string) => {
    setIsLoading(true);

    const filteredUser = await searchUserList(keyword);

    setUserProfiles(filteredUser);

    setIsLoading(false);
  };

  return { isLoading, userProfiles, initUserProfiles, searchUserProfiles };
};

export default useFetchUserList;
