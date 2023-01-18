import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';

import { postCoverImage, postProfileImage } from '../../apis/userInfo';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import ImageUpload from '../StoryEdit/ImageUpload';

interface Props {
  type: string;
  image: string;
  open: boolean;
  handleOpen: () => void;
}

const ImageForm = ({ type, image, open, handleOpen }: Props) => {
  const [imageBase64, setImageBase64] = useState(image);
  const [imageFile, setImageFile] = useState<File | null>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImageBase64(image);
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
    formData.append('isCover', type === 'profileImage' ? 'false' : 'true');
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
      type === 'profileImage'
        ? await postProfileImage(formData)
        : await postCoverImage(formData);

      alert(`${type} 이미지가 변경되었습니다.`);
      handleOpen();
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
      <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
        {type} 이미지 변경
      </Button>
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
