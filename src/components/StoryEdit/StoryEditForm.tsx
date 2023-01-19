import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useStoryForm } from '../../hooks/useStory';
import { StoryData } from '../../interfaces/story';
import DatePicker from './DatePicker';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';

interface Props {
  story: StoryData;
  isNew: boolean;
}

const setInitialValues = (story: StoryData) => {
  if (story._id) {
    const { storyTitle, year, month, day, content } = JSON.parse(story.title);

    return {
      title: storyTitle,
      date: { year: Number(year), month: Number(month), date: Number(day) },
      imageURL: story.image,
      content,
    };
  }
};

const StoryEditForm = ({ story, isNew }: Props) => {
  const { state } = useLocation();

  const initialValues = setInitialValues(isNew ? story : state);

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
            label='제목'
            error={!!errors.content}
            onChange={handleChange}
          />
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
            label='설명'
            error={!!errors.content}
            onChange={handleChange}
          />
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
