import styled from '@emotion/styled';
import { Button, Divider, Stack } from '@mui/material';
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

  const validate = () => {
    if (oldImage === imageBase64) return '현재 이미지와 일치합니다.';
    if (!imageFile) return '이미지를 추가해 주세요.';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const error = validate();
    if (error) {
      setError(error);
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
      <Divider />
      <Stack
        direction='row'
        spacing={0}
        justifyContent='center'
        sx={{ width: '100%' }}>
        <Button
          type='button'
          variant='outlined'
          color='warning'
          disabled={isLoading}
          size='large'
          onClick={handleOpen}
          sx={{
            width: '50%',
          }}>
          취소
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='warning'
          disabled={isLoading}
          sx={{ width: '50%' }}>
          {type} 이미지 변경
        </Button>
      </Stack>
    </form>
  );
};

export default ImageForm;

const InputWrapper = styled.div`
  padding: 5px 18px 12px 18px;
`;

const ErrorText = styled.small`
  color: red;
`;
