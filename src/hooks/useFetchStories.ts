import { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const useFetchStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const { data: fetchedStories } = await axios({
          url: `${
            import.meta.env.VITE_API_URL
          }/posts/author/63bcf0d4f596c65f9ee2f226`,
          method: 'GET',
        });
        setStories(fetchedStories);
      } catch (error) {
        console.error(error);
        alert('스토리북 조회 중 에러가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  return { stories, isLoading };
};

export default useFetchStories;
