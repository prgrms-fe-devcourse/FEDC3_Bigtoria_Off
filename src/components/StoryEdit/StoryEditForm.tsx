import styled from '@emotion/styled';

import useStoryForm from '../../hooks/useStoryForm';
import DatePicker from './DatePicker';
import ImageInput from './ImageInput';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

const StoryEditForm = () => {
  const {
    date,
    image,
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
        <InputDiv>
          <DatePicker value={date} onChange={handleDateChange} />
        </InputDiv>
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
            isAdded={image !== ''}
          />
          <div>{image && <ImagePreview src={image} alt='preview-image' />}</div>
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
      <SubmitButton loading={isLoading} />
    </form>
  );
};

export default StoryEditForm;

const Section = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Label = styled.label`
  width: 50px;
`;

const InputDiv = styled.div`
  width: 100%;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: 300px;
  object-fit: contain;
`;
