import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

import { postCoverImage, postProfileImage } from '../../apis/userInfo';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import ImageUpload from '../StoryEdit/ImageUpload';

interface Props {
  type: string;
  oldImage: string;
  open: boolean;
  handleOpen: () => void;
}

const ImageForm = ({ type, oldImage, open, handleOpen }: Props) => {
  const [imageBase64, setImageBase64] = useState(oldImage);
  const [imageFile, setImageFile] = useState<File | null>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImageBase64(oldImage);
    setError('');
  }, [open]);

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        if (!reader.result || typeof reader.result !== 'string') return;
        const result = reader.result;
        setImageBase64(result);
        resolve(Promise);
      };
    });
  };

  const handleChange = (imageFile: File) => {
    setImageFile(imageFile);
    encodeFileToBase64(imageFile);
    setError('');
  };

  const handleDelete = () => {
    setImageFile(null);
    setImageBase64('');
  };

  const generateFormData = () => {
    const formData = new FormData();
    formData.append('isCover', type === '커버' ? 'true' : 'false');
    if (imageFile) formData.append('image', imageFile);

    return formData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!imageFile) {
      setError('이미지를 추가해 주세요');
      setIsLoading(false);
      return;
    }

    try {
      const formData = generateFormData();
      type === '프로필'
        ? await postProfileImage(formData)
        : await postCoverImage(formData);

      alert(`${type} 이미지가 변경되었습니다.`);
      handleOpen();
      location.reload();
    } catch (error) {
      console.error(error);
      alert(ERROR_MESSAGES.INVOKED_ERROR_POSTING_STORY);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <ImageUpload
          src={imageBase64}
          onChange={handleChange}
          onDelete={handleDelete}
        />
        <ErrorText>{error}</ErrorText>
      </InputWrapper>
      <ButtonWrapper>
        <Button
          type='button'
          variant='outlined'
          disabled={isLoading}
          fullWidth
          onClick={handleOpen}>
          취소
        </Button>
        <Button
          type='submit'
          variant='contained'
          disabled={isLoading}
          fullWidth>
          {type} 이미지 변경
        </Button>
      </ButtonWrapper>
    </form>
  );
};

export default ImageForm;

const InputWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ErrorText = styled.small`
  color: red;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
