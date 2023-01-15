import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteStoryLike } from '../apis/story';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { ROUTES } from '../constants/routes';
import { Like } from '../interfaces/like';
import { postNotification } from './../apis/notification';
import { postStoryLike } from './../apis/story';

const useLike = (userId: string, storyLikes: Like[], storyId: string) => {
  const [isLike, setIsLike] = useState(false);
  const [likeId, setLikeId] = useState('');
  const [likeCount, setLikeCount] = useState(storyLikes.length);
  const navigate = useNavigate();

  useEffect(() => {
    const findStoryLike = storyLikes.find((data) => data.user === userId);
    if (findStoryLike) {
      setIsLike(true);
      setLikeId(findStoryLike._id);
    }
  }, [userId]);

  const handleClick = async () => {
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      navigate(ROUTES.SIGNIN);
      return;
    }

    try {
      if (isLike) {
        await deleteStoryLike(likeId);
        setIsLike(false);
        setLikeId('');
        setLikeCount(likeCount - 1);
      } else {
        const like = await postStoryLike(storyId);
        setIsLike(true);
        setLikeId(like);
        setLikeCount(likeCount + 1);
        await postNotification('LIKE', like._id, userId, storyId);
      }
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_LIKE);
    }
  };

  return { isLike, likeCount, handleClick };
};

export default useLike;
