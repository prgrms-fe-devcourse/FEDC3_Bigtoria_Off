import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteStoryComment, postStoryComment } from '../apis/story';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { ROUTES } from '../constants/routes';
import { isBlankString } from '../utils/validations';

export const useCommentForm = () => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { storyId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleDelete = async (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      try {
        if (!commentId) {
          navigate(ROUTES.NOT_FOUND);
          return;
        }
        await deleteStoryComment(commentId);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_DELETING_COMMENT);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isBlankString(comment)) {
      alert('댓글 내용을 입력해 주세요.');
    } else {
      try {
        if (!storyId) {
          navigate(ROUTES.NOT_FOUND);
          return;
        }
        await postStoryComment(comment, storyId);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_COMMENT);
      } finally {
        setComment('');
      }
    }

    setIsLoading(false);
  };

  return { comment, isLoading, handleChange, handleDelete, handleSubmit };
};
