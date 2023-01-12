import styled from '@emotion/styled';
import { Box } from '@mui/material';

import useStoryForm from '../../hooks/useStoryForm';
import DatePicker from './DatePicker';
import ImageInput from './ImageInput';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

const StoryEditForm = () => {
  const {
    date,
    imageBase64,
    isLoading,
    errors,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleImageDelete,
    handleSubmit,
  } = useStoryForm();

  return (
    <form onSubmit={handleSubmit}>
      <Section>
        <Label>날짜</Label>
        <Box sx={{ width: '100%' }}>
          <DatePicker value={date} onChange={handleDateChange} />
        </Box>
      </Section>
      <Section>
        <Label>제목</Label>
        <InputDiv>
          <TextInput
            name='title'
            placeholder='스토리의 제목을 입력하세요.'
            onChange={handleChange}
          />
          {errors.title}
        </InputDiv>
      </Section>
      <Section>
        <Label>사진</Label>
        <InputDiv>
          <ImageInput
            onChange={handleImageChange}
            onDelete={handleImageDelete}
            isAdded={imageBase64 !== ''}
          />
          <div>
            {imageBase64 && (
              <ImagePreview src={imageBase64} alt='preview-image' />
            )}
          </div>
        </InputDiv>
      </Section>
      <Section>
        <Label>내용</Label>
        <InputDiv>
          <TextInput
            name='content'
            multiline
            placeholder='스토리의 내용을 입력하세요.'
            onChange={handleChange}
          />
          {errors.content}
        </InputDiv>
      </Section>
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};
export default StoryEditForm;

const Section = styled(Box)`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Label = styled.label`
  width: 50px;
`;

const InputDiv = styled(Box)`
  width: 100%;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;
