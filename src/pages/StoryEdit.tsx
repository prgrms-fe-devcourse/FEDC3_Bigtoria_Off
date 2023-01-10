import styled from '@emotion/styled';

import {
  DatePicker,
  SubmitButton,
  TextInput,
  ImageInput,
} from '../components/StoryEdit';
import useForm from '../hooks/useStoryForm';

const StoryEditPage = () => {
  const {
    date,
    isLoading,
    errors,
    handleChange,
    handleDateChange,
    handleImageChange,
    handleSubmit,
  } = useForm();

  return (
    <Container>
      <h1>스토리 추가</h1>
      <form onSubmit={handleSubmit}>
        <Section>
          <Label>날짜</Label>
          <DatePicker value={date} onChange={handleDateChange} />
        </Section>
        <Section>
          <Label>제목</Label>
          <TextInput
            name='title'
            placeholder='스토리의 제목을 입력하세요.'
            onChange={handleChange}
          />
          <ErrorText>{errors.title}</ErrorText>
        </Section>
        <Section>
          <Label>사진</Label>
          <ImageInput onChange={handleImageChange} />
        </Section>
        <Section>
          <Label>내용</Label>
          <TextInput
            name='description'
            multiline
            placeholder='스토리의 내용을 입력하세요.'
            onChange={handleChange}
          />
          <ErrorText>{errors.description}</ErrorText>
        </Section>
        <SubmitButton loading={isLoading} />
      </form>
    </Container>
  );
};

export default StoryEditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Label = styled.label`
  width: 50px;
`;

const ErrorText = styled.small`
  color: red;
`;
