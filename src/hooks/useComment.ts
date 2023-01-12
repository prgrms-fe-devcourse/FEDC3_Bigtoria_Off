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
      try {
        if (!storyId) throw Error('잘못된 스토리 접근(storyId)');
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

  return { comment, isLoading, handleChange, handleSubmit };
};

export const useDeleteComment = () => {
  const handleDelete = async (commentId: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      try {
        if (!commentId) throw Error('잘못된 댓글 접근(commentId)');
        await deleteStoryComment(commentId);
      } catch (error) {
        console.error(error);
        alert(ERROR_MESSAGES.INVOKED_ERROR_DELETING_COMMENT);
      }
    }
  };

  return { handleDelete };
};
