import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useStoryForm } from '../../hooks/useStory';
import DatePicker from './DatePicker';
import ImageUpload from './ImageUpload';
import SubmitButton from './SubmitButton';

const StoryEditForm = () => {
  const { state } = useLocation();

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
  } = useStoryForm(state);

  const image = values.imageURL || imageBase64;

  return (
    <form onSubmit={(e) => handleSubmit(e, state?.imagePublicId || '')}>
      <Section>
        <Box sx={{ width: '100%' }}>
          <DatePicker value={date} onChange={handleDateChange} />
        </Box>
      </Section>
      <Section>
        <InputDiv>
          <TextField
            name='title'
            color='warning'
            variant='outlined'
            value={values.title}
            fullWidth
            label='제목'
            error={!!errors.content}
            helperText={errors.content}
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
          <TextField
            name='content'
            color='warning'
            variant='outlined'
            value={values.content}
            fullWidth
            multiline
            rows={10}
            label='설명'
            error={!!errors.content}
            helperText={errors.content}
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
