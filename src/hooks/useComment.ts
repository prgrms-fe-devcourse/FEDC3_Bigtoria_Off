import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { deleteStoryComment, postStoryComment } from '../apis/story';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const useCommentForm = () => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { storyId } = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (comment.trim().length === 0) {
      alert('댓글 내용을 입력해 주세요.');
    } else {
      setIsLoading(true);
      try {
        if (!storyId) throw Error;
        await postStoryComment(comment, storyId);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_COMMENT);
      } finally {
        setComment('');
        setIsLoading(false);
      }
    }
  };

  return { comment, isLoading, handleChange, handleSubmit };
};

export const useDeleteComment = () => {
  const handleDelete = async (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      try {
        if (!commentId) throw Error();
        await deleteStoryComment(commentId);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_DELETING_COMMENT);
      }
    }
  };

  return { handleDelete };
};
