import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { useStoryForm } from '../../hooks/useStory';
import { StoryData } from '../../interfaces/story';
import DatePicker from './DatePicker';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

interface Props {
  story: StoryData;
}

const StoryEditForm = ({ story }: Props) => {
  let initialValues;
  if (story._id) {
    const { storyTitle, year, month, day, content } = JSON.parse(story.title);

    initialValues = {
      title: storyTitle,
      date: { year: Number(year), month: Number(month), date: Number(day) },
      imageURL: story.image,
      content,
    };
  }

  const {
    values,
    date,
    imageBase64,
    isLoading,
    errors,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleImageDelete,
    handleSubmit,
  } = useStoryForm(initialValues);

  const image = values.imageURL || imageBase64;

  return (
    <form onSubmit={(e) => handleSubmit(e, story.imagePublicId)}>
      <Section>
        <Box sx={{ width: '100%' }}>
          <DatePicker value={date} onChange={handleDateChange} />
        </Box>
      </Section>
      <Section>
        <InputDiv>
          <TextInput
            name='title'
            value={values.title}
            placeholder='스토리의 제목을 입력하세요'
            onChange={handleChange}
          />
          <ErrorText>{errors.title}</ErrorText>
        </InputDiv>
      </Section>
      <Section>
        <InputDiv>
          <ImageUpload
            src={image}
            onChange={handleImageChange}
            onDelete={handleImageDelete}
          />
        </InputDiv>
      </Section>
      <Section>
        <InputDiv>
          <TextInput
            name='content'
            value={values.content}
            multiline
            rows={10}
            placeholder='스토리의 내용을 입력하세요'
            onChange={handleChange}
          />
          <ErrorText>{errors.content}</ErrorText>
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

const InputDiv = styled(Box)`
  width: 100%;
  text-align: right;
`;

const ErrorText = styled.small`
  color: red;
`;
