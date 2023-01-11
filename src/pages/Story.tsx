import styled from '@emotion/styled';
import { Divider, Paper } from '@mui/material';

import CommentForm from '../components/Story/CommentForm';
import CommentList from '../components/Story/CommentList';
import LikeButton from '../components/Story/LikeButton';

const user = {
  _id: '1',
  image: '',
  fullName: '유리',
};

const comments = [
  {
    _id: '1',
    comment: '멋집니다!',
    author: user,
    createdAt: '2023-01-11 15:06',
  },
  {
    _id: '2',
    comment: '멋집니다!',
    author: user,
    createdAt: '2023-01-11 15:06',
  },
  {
    _id: '3',
    comment: '멋집니다!',
    author: user,
    createdAt: '2023-01-11 15:06',
  },
];
const Story = () => {
  return (
    <Container>
      <Title>
        <h1>스토리 제목</h1>
        <LikeButton likeCount={3} />
      </Title>
      <StoryContainer>
        <p>2023-01-11</p>
        <StoryImage
          src='https://user-images.githubusercontent.com/63575891/211744952-c87a61ad-b130-4d93-933b-96a438bccea3.jpeg'
          alt='story image'
        />
        <Paper variant='outlined' sx={{ padding: '30px', margin: '20px 0' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl
          dolor, egestas sit amet tellus eu, varius dictum leo. Vivamus mi nibh,
          condimentum vitae rutrum non, facilisis vitae mi. Duis iaculis
          imperdiet molestie. Etiam ornare molestie laoreet. Vivamus nisi
          tellus, fermentum vitae arcu vitae, dictum molestie elit. Proin vitae
          lacus nisl. Curabitur id sollicitudin erat. Pellentesque vulputate id
          turpis eu tempus. Aenean euismod risus eget accumsan gravida. Ut
          cursus massa non dictum interdum. Morbi venenatis luctus tellus, et
          auctor justo eleifend id.
        </Paper>
      </StoryContainer>
      <Divider />
      <CommentContainer>
        <CommentList comments={comments} />
        <CommentForm />
      </CommentContainer>
    </Container>
  );
};

export default Story;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;

const StoryImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
`;

const CommentContainer = styled.div``;
