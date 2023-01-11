import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getStoryDetail } from '../apis/story';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const useFetchStory = () => {
  const [story, setStory] = useState({
    likes: [],
    comments: [],
    _id: '',
    image: '',
    imagePublicId: '',
    title: '',
    channel: {},
    author: { image: '', fullName: '', _id: '' },
    createdAt: '',
    updatedAt: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { storyId } = useParams();

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      try {
        if (storyId) {
          const fetchedStories = await getStoryDetail(storyId);
          setStory(fetchedStories);
        } else {
          // TODO: 404 페이지로 리다이렉팅
        }
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_GETTING_STORY);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, []);

  return { story, isLoading };
};

export default useFetchStory;
