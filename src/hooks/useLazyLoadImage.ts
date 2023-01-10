import { useState, useRef, useEffect } from 'react';

const LOAD_IMAGE_EVENT_TYPE = 'loadImage';

const useLazyLoadImage = (lazy = false) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }

    const handleLoadImage = () => {
      setLoaded(true);
    };

    imageRef.current?.addEventListener(LOAD_IMAGE_EVENT_TYPE, handleLoadImage);

    return () => {
      imageRef.current?.removeEventListener(
        LOAD_IMAGE_EVENT_TYPE,
        handleLoadImage
      );
    };
  }, []);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries, intersectionObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectionObserver.unobserve(entry.target);
            entry.target.dispatchEvent(new CustomEvent(LOAD_IMAGE_EVENT_TYPE));
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    imageRef.current && observer.observe(imageRef.current);
  }, []);

  return { loaded, imageRef };
};

export default useLazyLoadImage;
