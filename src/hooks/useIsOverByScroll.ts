import { useEffect, useRef, useState } from 'react';

const useIsOverByScroll = () => {
  const ref = useRef<HTMLElement>(null);
  const [isOverByScroll, setIsOverByScroll] = useState(false);

  useEffect(() => {
    const refHeight = ref.current?.getBoundingClientRect();
    const scrollEvent = () => {
      if (refHeight && window.scrollY > refHeight?.height) {
        setIsOverByScroll(true);
        return;
      }

      setIsOverByScroll(false);
    };

    document.addEventListener('scroll', scrollEvent);
    return () => {
      document.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return { ref, isOverByScroll };
};

export default useIsOverByScroll;
