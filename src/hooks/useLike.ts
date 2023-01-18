import { useEffect, useState } from 'react';

import { deleteStoryLike } from '../apis/story';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { Like } from '../interfaces/like';
import { postNotification } from './../apis/notification';
import { postStoryLike } from './../apis/story';

const useLike = (
  userId: string,
  authorId: string,
  storyLikes: Like[],
  storyId: string
) => {
  const [isLike, setIsLike] = useState(false);
  const [likeId, setLikeId] = useState('');
  const [likeCount, setLikeCount] = useState(storyLikes.length);

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
      return;
    }

    try {
      if (isLike) {
        await deleteStoryLike(likeId);
        setIsLike(false);
        setLikeId('');
        setLikeCount(likeCount - 1);
      } else {
        const { _id, user } = await postStoryLike(storyId);
        setIsLike(true);
        setLikeId(_id);
        setLikeCount(likeCount + 1);
        //like를 누른 사람(user)과 게시글 작성자(authorId)가 다르다면 Like보내기
        if (user !== authorId) {
          await postNotification('LIKE', _id, authorId, storyId);
        }
      }
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_LIKE);
    }
  };

  return { isLike, likeCount, handleClick };
};

export default useLike;
