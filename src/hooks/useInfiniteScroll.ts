import { useState } from 'react';

import { getUserList, searchUserList } from '../apis/search';
import { DATA_LIMIT } from '../constants/apiParams';
import { User } from '../interfaces/user';
import useIntersectionObserver from './useIntersectionObserver';

const useInfiniteScroll = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [searchedData, setSearchedData] = useState<User[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isAllRendered, setIsAllRendered] = useState(false);
  const [offset, setOffset] = useState(0);

  const initAllStateAndGetDataWithAPI = async () => {
    setIsLoaded(true);

    //initialize
    setIsAllRendered(false);
    setIsSearched(false);
    setOffset(1);

    const result = await getUserList();

    setData(result);

    setIsLoaded(false);
  };

  const searchDataWithState = async (keyword: string) => {
    setIsLoaded(true);

    //initialize
    setIsAllRendered(true);
    setIsSearched(true);
    setOffset(1);

    const filteredUsers = await searchUserList(keyword);

    setSearchedData(filteredUsers);
    setData(filteredUsers.slice(0, DATA_LIMIT));

    if (filteredUsers.length > DATA_LIMIT) setIsAllRendered(false);

    setIsLoaded(false);
  };

  const getMoreDataWithAPI = async () => {
    setIsLoaded(true);

    const result = await getUserList(offset * DATA_LIMIT);

    setData([...(data || []), ...result]);

    setOffset((cur) => cur + 1);

    if (result.length === 0) setIsAllRendered(true);

    setIsLoaded(false);
  };

  const getMoreDataWithState = () => {
    const start = offset * DATA_LIMIT;
    const bound =
      searchedData && start + DATA_LIMIT >= searchedData.length
        ? searchedData.length
        : start * DATA_LIMIT;

    setData([...(data || []), ...(searchedData?.slice(start, bound) || [])]);

    setOffset((cur) => cur + 1);

    searchedData && bound === searchedData.length && setIsAllRendered(true);
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoaded) {
        !isSearched ? await getMoreDataWithAPI() : getMoreDataWithState();
      }
    },
  });

  return {
    setTarget,
    data,
    setData,
    isLoaded,
    setIsLoaded,
    isAllRendered,
    initAllStateAndGetDataWithAPI,
    searchDataWithState,
  };
};

export default useInfiniteScroll;
