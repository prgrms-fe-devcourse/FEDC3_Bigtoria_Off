import { useRef, useState } from 'react';

import { getUserList } from '../apis/search';
import { DATA_LIMIT } from '../constants/apiParams';
import { User } from '../interfaces/user';
import useIntersectionObserver from './useIntersectionObserver';

const useInfiniteScroll = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAllRendered, setIsAllRendered] = useState(false);
  const [offset, setOffset] = useState(0);

  const getMoreItem = async () => {
    setIsLoaded(true);

    const result = await getUserList(offset * DATA_LIMIT);

    setOffset((cur) => cur + 1);

    if (result.length === 0) setIsAllRendered(true);

    setData([...(data || []), ...result]);

    setIsLoaded(false);
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoaded) {
        await getMoreItem();
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
  };
};

export default useInfiniteScroll;
